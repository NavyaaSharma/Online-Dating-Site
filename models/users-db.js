var mongoose=require('mongoose')

var userschema=new mongoose.Schema({
    facebook:{
        type:String
    },
    google:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    online:{
        type:Boolean,
        default:false
    },
    wallet:{
        type:Number,
        default:0
    },
    password:{
        type:String
    }
})

var users=mongoose.model('users',userschema)

module.exports=users