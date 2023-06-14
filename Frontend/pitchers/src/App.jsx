import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Header/Navbar';
import Intro from './components/Header/Intro';

function App() {


  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Intro/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
