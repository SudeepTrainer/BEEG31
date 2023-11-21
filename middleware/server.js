const express = require('express');

const app = express();
const port = 3000;

//global middleware
app.use(loggingMiddleware);
function loggingMiddleware(req,res,next){
    console.log("middleware called");
    console.log(req.originalUrl);
    console.log("before");
    next();
    console.log("after");
}
const defaultResponse = function (requestObject,responseObject,nextMiddleware){
    console.log("routing action called");
    responseObject.send("<h1>Default home page</h1>")
}
// routing level middleware
app.get("/",middleware,defaultResponse);
function middleware(req,res,next){
    console.log("routing level middleware called");
    next();
}

app.get('/login',auth,(req,res,next)=>{
    res.send("<h1>Login page</h1>")
})
function auth(req,res,next){
    console.log("auth middleware function called");
    next();
}

app.listen(port,()=>{
    console.log("listening on port 3000");
})