console.log("First statement");
setTimeout(()=>{
    console.log("Second statement");
},1000);
console.log("Third statement");

function multiply(a,b){
    return a * b;
}

function square(n){
    return multiply(n,n);
}

console.log(square(4));

function a(){
    // throw new Error("error from a");
    console.log("error");
}

function b(){
   return a();
}

function c(){
    b();
}
c();

// Stack overflow
function d(){
    d();
}

d();