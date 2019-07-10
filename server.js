var express=require('express')
var exphbs=require('express-handlebars')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var passport=require('passport')


var message=require('./models/contact-db')
var users=require('./models/users-db')
var keys=require('./config/keys')
require('./passport/facebook')
require('./passport/google')


var app=express()
var port=process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret:'ssshhh',
    saveUninitialized:true,
    resave:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
    res.locals.user=req.user || null
    next()
})


app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')


app.get('/',(req,res)=>{
    res.render('home',{
        title:'HOME'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT'
    })
})

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'CONTACT'
    })
})

app.get('/profile',(req,res)=>{
    users.findById({_id:req.user._id}).then((user)=>{
        if(user){
            user.online=true
            user.save((err,user)=>{
                if(err){
                    throw err
                }
                else{
                    res.render('profile',{
                        user
                    })
                }
            })
        }
    })
})

app.get('/logout',(req,res)=>{
    users.findById({_id:req.user._id}).then((user)=>{
        user.online=false
        user.save((err,user)=>{
            if(err)
            {
                throw err
            }
            if(user){
                req.logOut()
                res.redirect('/')
            }
        })

    })
})

app.post('/ContactUs',(req,res)=>{
    //console.log(req.body)
    const newmsg={
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        date:new Date
    }

    new message(newmsg).save((err,data)=>{
        if(err)
        {
            throw err
        }
        res.render('thanks')
    })

})

app.get('/auth/facebook',passport.authenticate('facebook',{
    scope:['email']
}))

app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect:'/profile',
    failureRedirect:'/'
}))

app.get('/auth/google',passport.authenticate('google',{
    scope:['email','profile']
}))

app.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect:'/profile',
    failureRedirect:'/'
}))

app.listen(port,()=>{
    console.log('server started')
})