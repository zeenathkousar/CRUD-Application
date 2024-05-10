const mongoose=require('mongoose');

const studentapi=mongoose.Schema({
    StudentName:{
        type:String,
        required:true
    },
    Rollno:{
        type:String,
        required:true
    },
    Marks:{
        type:String,
        required:true
    }
    
})

module.exports=mongoose.model('collection1',studentapi)