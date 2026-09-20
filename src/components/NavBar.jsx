import React, { useContext, useState, useEffect } from 'react'
import { ReferenceContext } from '../context/Ref'
import { FileText, Plus, List, Sun, Moon } from 'lucide-react'

const NavBar = () => {

 const {scrollToNotes , scrollTohome} = useContext(ReferenceContext);
 const [theme, setTheme] = useState('dark');

 useEffect(() => {
   const savedTheme = localStorage.getItem('theme') || 'dark';
   setTheme(savedTheme);
   document.documentElement.classList.toggle('dark', savedTheme === 'dark');
 }, []);

 const toggleTheme = () => {
   const newTheme = theme === 'dark' ? 'light' : 'dark';
   setTheme(newTheme);
   localStorage.setItem('theme', newTheme);
   document.documentElement.classList.toggle('dark', newTheme === 'dark');
 };
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Notes</h1>
        </div>
        <nav className="flex items-center gap-1">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            onClick={scrollTohome}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Note</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            onClick={scrollToNotes}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </button>
          <div className="w-px h-6 bg-border mx-1" />
          <button 
            className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
