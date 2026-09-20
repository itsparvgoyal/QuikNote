import React, { useState , useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams , useLocation } from 'react-router-dom';
import { addNote  , updateNote  } from '../redux/NotesSlice';
import { useSelector } from 'react-redux'
import { ReferenceContext } from '../context/Ref';
import { PenLine, Save, Plus } from 'lucide-react';

const Home = () => {
    
    const {scrollTohome , scrollToNotes , homeRef , noteRef} = useContext(ReferenceContext);

    const [searchParams , setParams] = useSearchParams();
    const [title , setTitle] = useState('');
    const [value , setValue] = useState('');
    const [error, setError] = useState('');
    const notesID = searchParams.get("id");
    const location = useLocation();
    const dispatch = useDispatch();
    
    function setPaste(){

        // create paste 
        if(title.trim() === '' || value.trim() === ''){
            setError('Title and Content are required !!');
            return;
        }

        setError('');        
        const paste = {
            title: title,
            content: value,
            _id: notesID || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        
        if(notesID){
            // update note
             dispatch(updateNote(paste));
        }else{
            // new note
            dispatch(addNote(paste));
        }

        // after paste addition clear UI
        setTitle('');
        setValue('');
        setParams({});
    }

    function addAsNew(){
        if(title.trim() === '' || value.trim() === ''){
            setError('Title and Content are required !!');
            return;
        }

        setError('');        
        const paste = {
            title: title,
            content: value,
            _id: Date.now().toString(36),
            createdAt: new Date().toISOString()
        }
        
        dispatch(addNote(paste));

        // after paste addition clear UI
        setTitle('');
        setValue('');
        setParams({});
    }

    const allNotes = useSelector((state) => state.notes.notes);


    useEffect(() => {

        if(notesID){
            // edit note
            const note = allNotes.find(
                (item) => item._id === notesID
            );

            if(note){
                setTitle(note.title);
                setValue(note.content);
            }
        }
        
        // jab viewNote ke button use kre uske baad scroll ka logic 
        if(location.state?.scrollTo === 'notes'){
            setTimeout(()=>{
                scrollToNotes();
            } , 100)
        }
        if(location.state?.scrollTo === 'home'){
            setTimeout(()=>{
                scrollTohome();
            } , 100)        
        }

    }, [notesID , location]);


    return (
        <section className="min-h-screen bg-background py-12 px-6" ref={homeRef}>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <PenLine className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">
                        {notesID ? "Edit Note" : "Create Note"}
                    </h2>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input  
                            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"  
                            type="text" 
                            placeholder="Enter title..." 
                            value={title} 
                            onChange={(e)=> setTitle(e.target.value)} 
                            required
                        />

                        <div className="flex gap-2">
                            {notesID && (
                                <button 
                                    className="flex items-center justify-center gap-2 px-5 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg font-medium hover:bg-accent transition-colors"
                                    onClick={addAsNew}
                                >
                                    <Plus className="h-4 w-4" />
                                    Add as New
                                </button>
                            )}
                            <button 
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                                onClick={setPaste}
                            >
                                <Save className="h-4 w-4" />
                                {notesID ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <p className="text-destructive text-sm font-medium mb-4 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                            {error}
                        </p>
                    )}
                    
                    <textarea 
                        required  
                        className="w-full min-h-100 p-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all leading-relaxed"
                        value={value} 
                        placeholder="Start writing your note..." 
                        onChange={(e)=> setValue(e.target.value)}
                    />
                </div>
            </div>
        </section>
    )

}

export default Home
