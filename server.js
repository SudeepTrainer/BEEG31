const http = require('http');
const queryString = require('querystring');
const fs = require('fs')
// const port = process.env.PORT || 1337;
const server = http.createServer(function(req,res){
    console.log("request listener called");
    console.log(req.url);
    // res.write("Hi from server");
    if(req.url==="/"){
        respondText(req,res)
    }else if(req.url==="/json"){
        respondJson(req,res)
    }else if(req.url.match(/^\/converttouppercase/)){
        respondConvert(req,res)
    }else if (req.url.match(/^\/echo/)){
        respondEcho(req,res)
    }else if (req.url.match(/^\/static/)){
        respondStatic(req,res)
    }
    else respondNothing(req,res)
})
server.listen(3000,()=>{
    console.log("listening to the requests on 3000");
});

function respondText(req,res){
    res.setHeader("Content-Type","text/plain")
    res.end("HI from the server")
}

function respondJson(req,res){
    res.setHeader("Content-Type","application/json");
    res.end(JSON.stringify({name:"Bill","age":21}));
}

function respondNothing(req,res){
    res.writeHead(404,"Not found");
    res.end("Nothing found")
}

function respondEcho(req,res){
    // console.log(req.url.split("?"));
    // console.log(req.url.split("?").slice(1));
    // console.log(req.url.split("?").slice(1).join(''));
    // console.log(queryString.parse(req.url.split("?").slice(1).join('')));
    const {input} = queryString.parse(req.url.split("?").slice(1).join(''));
    res.end(JSON.stringify({
        normal:input,
        uppercase:input.toUpperCase(),
        length:input.length
    }))
}

function respondStatic(req,res){
    const filename = `${__dirname}/public${req.url.split("/static")[1]}`
    console.log(filename);
    fs.createReadStream(filename)
        .on('error',()=>respondNothing(req,res))
        .pipe(res)
}

function respondConvert(req,res){
    // console.log(req.url.split("?")[1]);
    const {input} = queryString.parse(req.url.split("?")[1]);
    res.write(input.toUpperCase());
    res.end();
}