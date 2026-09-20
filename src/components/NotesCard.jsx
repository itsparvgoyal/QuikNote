import React from 'react'
import { Calendar, Pencil, Eye, Trash2, Copy, Share2 } from 'lucide-react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { copyNotes, removeNote } from '../redux/NotesSlice';
import { useNavigate } from 'react-router-dom';


const NotesCard = (props) => {

    const allNotes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function edit(id){
      navigate(`/?id=${id}`);
      props.scrollTohome();
    }

    async function share(){

        if(navigator.share){

            await navigator.share({
                title: props.title,
                text: `Title : ${props.title}\nContent : ${props.content}`
            });

        }else{
            alert("Sharing not supported");
        }

    }

    function deleteNotes(id){
       const idx = allNotes.findIndex((item) => item._id === id);
       const obj = allNotes[idx];
       dispatch(removeNote(obj));
    }

    function copy(id){
       const idx = allNotes.findIndex((item) => item._id === id);
       const obj = allNotes[idx];
       dispatch(copyNotes(obj));
    }

    function view(id){
        navigate(`/notes/${id}`);
    }


  return (
    <article className="group bg-card border border-border rounded-xl overflow-hidden hover:border-ring/50 transition-all duration-200 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1">
            {props.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={() => edit(props.id)}
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={() => view(props.id)}
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={() => copy(props.id)}
              title="Copy"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" 
              onClick={() => share(props.id)}
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" 
              onClick={() => deleteNotes(props.id)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {props.content}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <time>{new Date(props.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        </div>
      </div>
    </article>
  )
}

export default NotesCard
