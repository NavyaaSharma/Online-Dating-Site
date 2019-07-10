var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/OnlineDating',{useNewUrlParser:true})

var store=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

var data=mongoose.model('data',store)

module.exports=data