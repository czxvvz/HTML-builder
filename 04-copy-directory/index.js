const fs = require('fs');
const path = require('path');
const nameDir = path.join(__dirname, 'files');
const nameNewDir = path.join(__dirname, 'files-copy');
fs.mkdir(nameNewDir, {recursive: true }, (err) => { if(err) throw err});
fs.readdir( nameDir, {encoding:'utf8', withFileTypes: true}, 
    (err, files) => 
    {
        for(let i = 0; i < files.length; ++i) 
        {
            if(files[i].isFile()) 
            {
                fs.copyFile(path.join(nameDir, files[i].name), path.join(nameNewDir, files[i].name), (err) =>{ if(err) throw err; } );
            }
        }
    });