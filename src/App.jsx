import { useState } from 'react'
import './App.css'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
import Allissue from './components/Allissue';
import DetilsIssue from './components/DetilsIssue';
function App() {

  return (
    <>
    <BrowserRouter>
    <nav>
    </nav>
    <ToastContainer/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/allissue' element={<Allissue/>}/>
     <Route path='/allissue/:id' element={<DetilsIssue/>}/>

    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
