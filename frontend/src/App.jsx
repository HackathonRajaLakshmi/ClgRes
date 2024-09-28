import React from 'react'
import Userpage from './components/Userpage/Userpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { AuthProvider } from './AuthContext'; 
import BookingPage from './components/BookingPage';
import Cart from './components/Cart/Cart';

const App = () => {
  return (
 <AuthProvider>  
   <Router>
    <Routes>
      <Route path="/" element={<Userpage/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/bookingpage" element={<BookingPage/>} />
    </Routes>
   </Router>
  </AuthProvider> 
  )
}

export default App
