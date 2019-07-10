var passport=require('passport')
var users=require('../models/users-db')
var GoogleStrategy=require('passport-google-oauth20').Strategy
var keys=require('../config/keys')

passport.serializeUser((user,done)=>{
    return done(null,user)
})

passport.deserializeUser((id,done)=>{
    users.findById(id,(err,user)=>{
        return done(err,user)
    })
})

passport.use(new GoogleStrategy({
    clientID:keys.GoogleClientID,
    clientSecret:keys.GoogleClientSecret,
    callbackURL:'http://localhost:3000/auth/google/callback',
    profileFields:['email','name','displayName','photos']
},(accessToken, refreshToken, profile, done)=>{
    console.log(profile)

    users.findOne({google:profile.id},(err,data)=>{
        if(err)
        {
            return done(err)
        }

        if(data)
        {
            return done(null,data)
        }

        else{
            var newuser={
                email:profile._json.email,
                firstname:profile._json.given_name,
                lastname:profile._json.family_name,
                fullname:profile.displayName,
                google:profile.id,
                image:profile.photos[0].value
            }

            new users(newuser).save((err,user)=>{
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