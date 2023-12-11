//callback hell

// getLocation(){
//     getLatLon({
//         getWeather(){
//             getWeatherIcon();
//         }
//     })
// }

// function hello(message){
//     console.log("Inside hello");
//     message()
// }

// function callback(){
//     setTimeout(()=>{
//         console.log("Inside callback");
//     },1000)
// }

// hello(callback);

// setTimeout(()=>{
//     //do something
//     const data = {user:"Bill"}
//     console.log(data);
//     setTimeout(()=>{
//         //do something
//         data.age = 12;
//         console.log(data);
//         setTimeout(()=>{
//             //do something again
//             data.gender = "Female";
//             console.log(data);
//         },500)
//     },500)
// },500)

// pending, fulfilled, reject
// function getWeather(){
//     return new Promise(function(resolve,reject){
//         setTimeout(()=>{
//             resolve("Winter");
//         },500);
//     })
// }

// function getWeatherDetail(weather){
//     return new Promise(function(resolve,reject){
//         switch(weather){
//             case "Summer": resolve("Hot winds");
//                 break;
//             case "Winter": resolve("Cold winds");
//                 break;
//             default: reject("Nothing found");
//         }
//     })
// }
// const weather = getWeather();
// console.log(weather);

// function onSuccess(data){
//     console.log(`Success ${data}`);
// }

// function onError(error){
//     console.log(`Error ${error}`);
// }

// getWeather().then((value)=>{
//     console.log(`First param success ${value}`);
// },(error)=>{
//     console.log(`Second param error ${error}`);
// })
// getWeather().then(onSuccess,onError);
// getWeather().then(onSuccess).catch(onError);
// getWeather()
//     .then(getWeatherDetail)
//     .then(onSuccess,onError);

// fetch('https://jsonplaceholder.typicode.com/users/')
//       .then(response => response.json())
//       .then(json => console.log(json))

async function getUsers(){
      const data = await fetch('https://jsonplaceholder.typicode.com/users/');
      const users = await data.json();
      console.log(users);
      return users;
}

getUsers();