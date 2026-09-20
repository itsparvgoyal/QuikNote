import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
    notes: localStorage.getItem("notes")
            ? JSON.parse(localStorage.getItem("notes"))
            : [] 
}

export const noteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addNote: (state , action) => {
       const paste = action.payload;
       state.notes.push(paste);
       localStorage.setItem("notes" , JSON.stringify(state.notes));
       toast.success("Added");
    },
    updateNote: (state , action) => {
        const paste = action.payload;
        const index = state.notes.findIndex((item) => item._id === paste._id);

        if(index >= 0){
            state.notes[index] = paste;
            localStorage.setItem("notes" , JSON.stringify(state.notes));
            toast.success("Updated");
        }

    },
    resetNotes: (state, action) => {
        state.notes = [];
        localStorage.setItem("notes" , JSON.stringify(state.notes));
    },
    removeNote: (state, action) => {
        const paste = action.payload;
        const index = state.notes.findIndex((item) => item._id === paste._id);

        if(index >= 0){
            state.notes.splice(index , 1);
            localStorage.setItem("notes" , JSON.stringify(state.notes));
            toast.success("Deleted");
        } 

    },
    copyNotes: (state, action) => {
        const { title, content } = action.payload;

        navigator.clipboard.writeText(
            `Title : ${action.payload.title}\nContent : ${action.payload.content}`
        );
        toast.success("Copied");
    },
  },
})


// Action creators are generated for each case reducer function
export const { addNote, updateNote, resetNotes , removeNote , copyNotes} = noteSlice.actions
export default noteSlice.reducer