import { useState } from 'react'
import './App.css'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
    <BrowserRouter>
    <nav>
    </nav>
    <ToastContainer/>
    <Routes>
     <Route path='/' element={<Home/>}/>

    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
