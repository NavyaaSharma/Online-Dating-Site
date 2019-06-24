var express=require('express')
var exphbs=require('express-handlebars')

var app=express()
var port=process.env.PORT || 3000

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

app.listen(port,()=>{
    console.log('server started')
})