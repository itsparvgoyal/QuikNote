import React, { useContext, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import NotesCard from '../components/NotesCard';
import { ReferenceContext } from '../context/Ref';
import { FileText, Search, X } from 'lucide-react';

const Notes = () => {
    
    const {noteRef , scrollTohome} = useContext(ReferenceContext);
    const allNotes = useSelector((state) => state.notes.notes);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = useMemo(() => {
      // agar luch search nhi kia toh sab notes dikha do 
      if (!searchQuery.trim()) return allNotes;
      // agar search kia hai toh 
      const query = searchQuery.toLowerCase();
      return allNotes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
    }, [allNotes, searchQuery]);

  return (
    <section className="min-h-screen bg-muted/30 py-12 px-6" ref={noteRef}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Recent Notes</h2>
            {allNotes.length > 0 && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {allNotes.length}
              </span>
            )}
          </div>
          
          {allNotes.length > 0 && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
        
        {allNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No notes yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Start capturing your thoughts by creating your first note above.
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No matching notes</h3>
            <p className="text-muted-foreground max-w-sm">
              No notes found matching "{searchQuery}". Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((elem) => (
              <NotesCard 
                title={elem.title} 
                content={elem.content} 
                date={elem.createdAt} 
                id={elem._id} 
                key={elem._id} 
                scrollTohome={scrollTohome} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Notes
