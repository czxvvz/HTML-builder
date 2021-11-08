const path = require("path");
const fs = require("fs");

function openFile(){
    let text = fs.createReadStream(path.join(__dirname, 'text.txt'), "utf-8");
    text.on('data', function (chunk){
        console.log(chunk);
    });
}
openFile();

