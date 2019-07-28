var mongoose=require('mongoose')

mongoose.connect('mongodb+srv://onlinedating:cedt1992@cluster0-qiapg.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})

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