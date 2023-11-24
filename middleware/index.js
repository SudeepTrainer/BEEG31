const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const jsonArray = [];

app.get("/",(req,res)=>{
    res.send("<h1>Home page</h1>");
})

app.post("/add",(req,res)=>{
    console.log(req.body);
    jsonArray.push(req.body);
    res.send("<h1>added successfully</h1>");
})

app.get("/array",(req,res)=>{
    res.json(jsonArray);
})

app.delete("/item",(req,res)=>{
    jsonArray.pop();
    res.json(jsonArray);
})
app.listen(port,()=>{
    console.log("listening to port 3000");
});