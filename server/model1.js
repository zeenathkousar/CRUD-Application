const mongoose=require('mongoose');

const studschema= mongoose.Schema({
    studname:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('collection2',studschema)