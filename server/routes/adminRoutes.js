const express = require('express');
const {loginAdmin} = require('../controllers/adminmodel');
const router = express.Router();
const adminAuth=require('../middlewares/adminAuth');

router.post('/admin/login',loginAdmin);

router.get('/admin/dashboard',adminAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

module.exports = router;
