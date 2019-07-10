var passport=require('passport')
var users=require('../models/users-db')
var FacebookStrategy=require('passport-facebook').Strategy
var keys=require('../config/keys')

passport.serializeUser((user,done)=>{
    return done(null,user)
})

passport.deserializeUser((id,done)=>{
    users.findById(id,(err,user)=>{
        return done(err,user)
    })
})

passport.use(new FacebookStrategy({
    clientID:keys.FacebookAppID,
    clientSecret:keys.FacebookAppSecret,
    callbackURL:'http://localhost:3000/auth/facebook/callback',
    profileFields:['email','name','displayName','photos']
},(accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    users.findOne({facebook:profile.id},(err,data)=>{
        if(err)
        {
           return done(err)
        }
        if(data){
            return done(null,data)
        }
        else{
            var newdata={
                facebook:profile.id,
                email:profile._json.email,
                firstname:profile._json.first_name,
                lastname:profile._json.last_name,
                fullname:profile.displayName,
                image:`https://graph.facebook.com/${profile.id}/picture?size=large`
            }

            new users(newdata).save((err,user)=>{
                if(err)
                {
                    return done(err)
                }
                if(user)
                {
                    return done(null,user)
                }
            })
        }
    })
}))