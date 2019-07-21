var passport=require('passport')
var LocalStrategy=require('passport-local')
var User=require('../models/users-db')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

passport.use(new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
},(email,password,done)=>{
    console.log(email)
    console.log(password)
    User.findOne({email:email,password:password},(err,data)=>{
        if(err)
        {
            throw err
        }   
        else
        {
            console.log('y')
            return done(null,data)
        }
    })
        
}))