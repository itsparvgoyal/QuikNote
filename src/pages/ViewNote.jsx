import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, Pencil, Trash2, Copy, Share2, ArrowLeft } from 'lucide-react'
import { copyNotes, removeNote } from '../redux/NotesSlice';
import { ReferenceContext } from '../context/Ref';

const ViewNote = () => {
  
    const {scrollTohome , scrollTonotes} = useContext(ReferenceContext);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();  
    const allNotes = useSelector((state) => state.notes.notes);
    const navigate = useNavigate();


    const note = allNotes.find(
        (item) => item._id === id
    );


    useEffect(() => {
        if (note) {
        setTitle(note.title);
        setValue(note.content);
        }

    }, [note]);
  

    function copyHandler(){
        const idx = allNotes.findIndex((item) => item._id === id);
        const obj = allNotes[idx];
        console.log(obj)
        dispatch(copyNotes(obj));
    }

    function edit(){
      navigate(`/?id=${id}` , {state:{scrollTo : "home"}});
    }

    function deleteNotes(){
        const idx = allNotes.findIndex((item) => item._id === id);
        const obj = allNotes[idx];
        dispatch(removeNote(obj));
        navigate('/' , {state: {scrollTo:"notes"}});
    }

    async function share(){

        if(navigator.share){

            await navigator.share({
                title: title,
                text: `Title : ${title}\nContent : ${value}`
            });

        }else{
            alert("Sharing not supported");
        }

    }

    function handleBack(){
        navigate('/' , {state : {scrollTo : "notes"}});
    }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background py-8 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Notes</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button 
              className="p-2.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={edit}
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              className="p-2.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={copyHandler}
              title="Copy"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button 
              className="p-2.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={share}
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              className="p-2.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" 
              onClick={deleteNotes}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <article className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-card-foreground mb-4 wrap-break-word">
              {title}
            </h1>
            
            {note?.createdAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(note.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
            )}
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap wrap-break-word">
                {value}
              </p>
            </div>
          </div>
        </article>
        
      </div>
    </main>
  )
}

export default ViewNote
