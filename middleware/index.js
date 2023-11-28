const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser);
const jsonArray = [];
app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.cookie("visited",true,{
        maxAge:60000
    })
    res.send("<h1>Home page</h1>");
})

app.post("/add",(req,res)=>{
    console.log(req.body);
    jsonArray.push(req.body);
    res.send("<h1>added successfully</h1>");
})

app.get("/array",(req,res)=>{
    res.send(jsonArray);
})

app.listen(port,()=>{
    console.log("listening to port 3000");
});