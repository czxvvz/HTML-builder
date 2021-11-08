console.log('Input the text:');
const readline = require('node:readline');
const process = require('process');
const fs = require('fs');
const path = require('path');
const input = process.stdin;
const text = fs.createWriteStream(path.join(__dirname, 'text.txt'), "utf-8");
const rl = readline.createInterface(input);
rl.on('close',  () => {text.close();
    console.log('goodbay!')});
rl.on('line', (input, output) => { verifyExit(input, output); console.log(">"); }) 
rl.on('SIGINT', () => {rl.close(); } ) 
function verifyExit(input, output){
    let exitSt = "exit";
    let isExit = true;
    if(input.length == 4)
    {
        for(let i = 0; i < 4; ++i)
        {
            if(input[i] != exitSt[i])
                {
                    isExit = false;
                    break;
                }
        }
        if(isExit)
            rl.close();
        else 
            text.write(input + '\n');
    }
    else
        text.write(input + '\n');
}