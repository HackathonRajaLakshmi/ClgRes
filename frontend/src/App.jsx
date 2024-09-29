import React from 'react'
import Userpage from './components/Userpage/Userpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { AuthProvider } from './AuthContext';
import BookingPage from './components/BookingPage';
import Cart from './components/Cart/Cart';
<<<<<<< HEAD
import { ToastContainer } from 'react-toastify';
=======
import Dashboard from './components/dashboard';
>>>>>>> 1018e34c3aa9d0906159a076e1dfefae8aa96873

const App = () => {
  return (
<AuthProvider>
   <Router>
    <Routes>
      <Route path="/" element={<Userpage/>}/>
      <Route path="/login" element={<LoginSignup/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/bookingpage" element={<BookingPage/>} />
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
   </Router>
<<<<<<< HEAD
   <ToastContainer/>
  </AuthProvider> 
 
=======
  </AuthProvider>
>>>>>>> 1018e34c3aa9d0906159a076e1dfefae8aa96873
  )
}

export default App
