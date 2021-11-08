const fs = require('fs');
const path = require('path');
const nameDir = path.join(__dirname, 'styles');
const nameNewDir = path.join(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.join(nameNewDir, 'bundle.css'));

fs.readdir(nameDir,{withFileTypes: true}, (err,files) => {checkInFolder(err, files, nameDir)});
function checkInFolder(err, files, directName)
{
    let fileRead = null;
    for(let file of files)
    {
        if(file.isDirectory())
        {
            foundDir = path.join(directName, file.name);
            fs.readdir(foundDir,{withFileTypes: true}, (err,files) => {checkInFolder(err, files, foundDir)});
        }
        else if(path.extname(file.name) == ".css")
        {
            fileRead = fs.createReadStream(path.join(directName, file.name));
            fileRead.pipe(bundle);
        }
    }
}