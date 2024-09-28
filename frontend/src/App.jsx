import React from 'react'
import Userpage from './components/Userpage/Userpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Userpage/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
    </Routes>
   </Router>
  )
}

export default App
