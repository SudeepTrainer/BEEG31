const express = require('express');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const databaseUri = 'mongodb://127.0.0.1:27017/mydb'
mongoose.connect(databaseUri)
    .then(res=>()=>{console.log(`db connected ${res}`)})
    .catch(err=>()=>{console.log(`Error connecting db ${err}`)})
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("DB connected");
})
db.on('error',()=>{
    console.log("Erorr in connecting");
})
const store = new mongoDBSession({
    uri:databaseUri,
    collection:"sessions"
})

const PORT = 3000;

const app = express();

//middleware
app.use(session({
    secret:'thisisforsigningcookie',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:60000
    },
    store:store
}));

// routing
app.get("/",(req,res)=>{
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Home page");
})

//start server
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})