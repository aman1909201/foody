const mongoose=require('mongoose')
const {Schema}=mongoose
const userschema=new Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('userrr',userschema) //in database connection will create
//data will get import with help of model 
// with help of model we can CRUD in mongodb with help of mongoose
//its wrapper of schema
