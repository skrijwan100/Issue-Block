import { useState } from 'react'
import './App.css'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
function App() {

  return (
    <>
    <BrowserRouter>
    <nav>
    </nav>
    <Routes>
     <Route path='/' element={<Home/>}/>

    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
