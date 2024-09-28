import React from 'react'
import Userpage from './components/Userpage/Userpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { AuthProvider } from './AuthContext'; 

const App = () => {
  return (
 <AuthProvider>  
   <Router>
    <Routes>
      <Route path="/" element={<Userpage/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
    </Routes>
   </Router>
  </AuthProvider> 
  )
}

export default App
