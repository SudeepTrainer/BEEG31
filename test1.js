const path = require('path')
const filePath = path.join("/images","image1.gif")
console.log(filePath);
console.log(path.basename(filePath));
console.log(path.resolve(__dirname,filePath));