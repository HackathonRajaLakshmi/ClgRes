const mongoose = require('mongoose');
const Bookings=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    booking:[{
       
       Vname:{
        type:String,
        required:true
       },
       VType:{
        type:String,
        required:true
       },
       date:{
        type:Date,
        required:true
       },
       bookingTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    urge: {
        type: String, 
        enum: ["High", "Mid", "Low"], 
        required: true
    },
    score: {
        type: Number, 
        required: true
    }
    }]
})
module.exports=mongoose.model('bookings',Bookings);