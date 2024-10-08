const express = require('express');
const { registerUser, loginUser } = require('../controllers/usermodel');
const userAuth = require('../middlewares/authMiddleware');
const router = express.Router();
const {booking,ShowCart} =require('../controllers/bookingController')
const {Vget}=require('../controllers/venuecontroller');

router.post('/register', registerUser);

router.post('/login',loginUser);
router.post('/book',userAuth,booking);
router.get('/getbookings',userAuth,ShowCart);
router.get('/getvenue',Vget);

router.get('/bookingpage/:name', userAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

router.get('/cart', userAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

module.exports = router;
