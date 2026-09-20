import React, { useContext, useRef } from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Notes from './pages/Notes'
import ViewNote from './pages/ViewNote'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { ReferenceContext } from './context/Ref'


const App = () => {
  
  const {homeRef , noteRef , scrollTohome , scrollToNotes} = useContext(ReferenceContext);

  return (
    <div className='overflow-hidden'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<><Hero/> <Home /> <Notes/></>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/notes/:id' element={<ViewNote/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
