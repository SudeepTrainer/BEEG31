const express = require('express');

const app = express();
const port = 3000;

//global middleware
app.use(middleware1);
app.use(loggingMiddleware);

function middleware1(req,res,next){
    console.log("middleware1 called");
    const errorObject = new Error("just another error");
    next(errorObject);
}

function errorHandler(err,req,res,next){
    console.log(err.stack);
    res.status(500).send("<h1>Please try after sometime</h1>")
}
function loggingMiddleware(req,res,next){
    console.log("middleware called");
    console.log(req.originalUrl);
    console.log("before");
    if(req.query.user === "admin"){
        next();
    }else{
        res.send("<h1>Admin can only access</h1>");
    }
    console.log("after");
}
const defaultResponse = function (requestObject,responseObject,nextMiddleware){
    console.log("routing action called");
    responseObject.send("<h1>Default home page</h1>")
}
// routing level middleware
app.get("/",defaultResponse);
app.get('/login',auth,(req,res,next)=>{
    res.send("<h1>Login page</h1>")
})
function auth(req,res,next){
    console.log("auth middleware function called");
    if(req.query.username === "abc" && req.query.password === "abc"){
        next();
    } else{
        res.send("<h1>Login failed</h1>");
    }
}
app.use(errorHandler);
app.listen(port,()=>{
    console.log("listening on port 3000");
})