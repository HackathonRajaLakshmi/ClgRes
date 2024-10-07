const mongoose = require('mongoose');
const VenueBookinks=mongoose.Schema({
    Vimage:{
        type:String,
        required:true
    },
    Vname:{
        type:String,
        required:true,
        unique:true
    },
    VType:{
        type:String,
        required:true
    },
    VRating:{
        type:Number,
        required:true,
    }

})
module.exports=mongoose.model('Vdata',VenueBookinks);