const http = require('http');
// const port = process.env.PORT || 1337;
const server = http.createServer(function(req,res){
    console.log("request listener called");
    console.log(req.url);
    // res.write("Hi from server");
    if(req.url==="/"){
        respondText(req,res)
    }else if(req.url==="/json"){
        respondJson(req,res)
    }else if (req.url===echo){
        respondEcho(req,res)
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