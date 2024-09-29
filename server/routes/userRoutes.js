const express = require('express');
const { registerUser, loginUser } = require('../controllers/usermodel');
const userAuth = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/register', registerUser);

router.post('/login',loginUser);

router.get('/bookingpage', userAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

router.get('/cart', userAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

module.exports = router;
