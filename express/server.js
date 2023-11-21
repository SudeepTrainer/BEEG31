const express = require('express')
const fs = require('fs')

const port = 3000;
const app = express();
app.get("/",respondText);
app.get("/person",respondJson);
app.get("/converttouppercase",respondConvert);
app.get("/static/*",respondFiles);
app.get("*",respondNothing);
function respondText(req,res){
    res.end("Hi from express server");
}
function respondJson(req,res){
    res.json({name:"Bill Gates",age:52})
}
function respondConvert(req,res){
    const {input} = req.query;
    res.json({normal:input,uppercase:input.toUpperCase()})
}
function respondNothing(req,res){
    res.writeHead(404);
    res.end("The page you are trying to access doesn't exist");
}
function respondFiles(req,res){
    console.log(req.params);
    const filename = `${__dirname}/public/${req.params[0]}`;
    fs.createReadStream(filename)
    .on('error',()=>{respondNothing(req,res)})
    .pipe(res);
}
app.listen(port,()=>{
    console.log("listening on the server");
})