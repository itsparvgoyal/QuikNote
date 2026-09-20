import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './redux/NotesSlice'

export const store = configureStore({
  reducer: {
    notes : notesReducer,
  },
})