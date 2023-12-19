const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const mongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const User = require("./models/user");
const Product = require("./models/product");
const databaseUri = 'mongodb://127.0.0.1:27017/mydb'
db().then(res=>console.log("connected")).catch(err => console.log(err));
async function db() {
  await mongoose.connect(databaseUri);
}
// const store = new mongoDBSession({
//     uri:databaseUri,
//     collection:"sessions"
// })
const PORT = 3000;
const app = express();


//middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

// middleware to be called for all requests
app.use((req,res,next)=>{
    const {auth} = req.cookies;
    if(auth){
        req.isAuthenticated = true;
    }else{
        req.isAuthenticated = false;
    }
    next();
})

const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated){
        next();
    }else{
        res.status(400).redirect("/login");
    }
}

// app.use(session({
//     secret:'thisisforsigningcookie',
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         secure:false,
//         maxAge:60000
//     },
//     store:store
// }));

app.get("/",isAuthenticated,async (req,res)=>{
    try{
        const products = await Product.find({});
        res.render('home',{products});
    }catch(error){
        console.log(error);
        res.status(500).render("home",{"error":"Internal server error"})
    }
})

app.get('/logout',(req,res)=>{
    res.clearCookie("auth");
    res.status(200).redirect("/login");
})

// routing
app.get("/login",(req,res)=>{
    // req.session.isAuth = true;
    // console.log(req.session);
    // console.log(req.session.id);
    res.render('login');
})

app.post('/login', async (req,res)=>{

    const {username,password} = req.body;
    try{
        // check if the user exists 
        const user = await User.findOne({username});
        // check for the password
        if(user && bcrypt.compareSync(password,user.password)){
            res.cookie('auth',true);
            res.status(200).redirect('/');
        }else{
            res.status(401).render('login',{error:'Please check the username and password'})
        }
    }catch(error){
        console.log(error);
        res.status(500).render('login',{'error':'Internal server error'})
    }
});

app.get("/register",(req,res)=>{
    res.render('register')
})

app.post("/register",async (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    try{
        // check if the req body has username and password
        if(!username || !password){
            throw new Error('Enter username and password');
        }
        // check if username already exists in DB
        const existingUser = await User.findOne(({username}));
        if(existingUser){
            res.status(400).render('register',{'error':'Username already exists'})
            return
        }
        // encrypt the password
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new User({
            username,
            password:hashedPassword
        })
        // save to DB
        await newUser.save();
        // everything goes well, go to login page
        res.status(201).redirect('/login');
    }catch(error){
        console.log(error);
        res.status(500).render('register',{'error':'Internal server error'})
    }
})
//start server
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})