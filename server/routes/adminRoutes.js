const express = require('express');
const {loginAdmin} = require('../controllers/adminmodel');
const router = express.Router();
const adminAuth=require('../middlewares/adminAuth');
const {VPut,Vget,editVenue,removeVenue}=require('../controllers/venuecontroller');
router.post('/admin/login',loginAdmin);
router.post('/admin/Add',adminAuth,VPut);   

router.put('/admin/edit/:id', adminAuth,editVenue);

router.delete('/admin/delete/:name', adminAuth,removeVenue);

router.get('/admin/dashboard',adminAuth, (req, res) => {
    res.json({ message: "This is a protected route!" });
});

module.exports = router;
