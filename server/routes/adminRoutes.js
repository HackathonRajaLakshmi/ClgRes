const express = require('express');
const {loginAdmin} = require('../controllers/adminmodel');
const router = express.Router();
const adminAuth=require('../middlewares/adminAuth');
const {VPut,Vget}=require('../controllers/venuecontroller');
router.post('/admin/login',loginAdmin);
router.post('/admin/Add',adminAuth,VPut);
router.get('/admin/getvenue',adminAuth,Vget);   
router.get('/admin/dashboard',adminAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

module.exports = router;
