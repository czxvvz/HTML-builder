const fs = require('fs');
const path = require('path');
const strDec = require('string_decoder');
const strDecoder = new strDec.StringDecoder('utf8');
//#template
const newDir = path.join(__dirname, 'project-dist');
const template = path.join(newDir, "template.html");
fs.copyFile(path.join(__dirname, "template.html"), template, (err) =>{ if(err) console.log(err);
    let htmlStr = fs.createReadStream(template);
    htmlStr.on('data', (chunk) => 
    {
        let positionSt = -2;
        let positionEnd = -2;
        let fileTag = null;
        let isExist = true;
        let chunkStr = strDecoder.write(chunk);
        let chunk2Str = null;
        let nameArray = [];
        let numOfName = 0;
        do
        {
            positionSt = chunk.indexOf("{{", positionSt + 2);
            if(positionSt == -1)
                isExist = false;
            else
            {
                positionEnd = chunk.indexOf("}}", positionEnd + 2);
                nameArray.push(strDecoder.write(chunk.slice(positionSt + 2, positionEnd)));
                fileTag = fs.createReadStream(path.join(__dirname, 'components', nameArray[nameArray.length - 1] + ".html"));
                fileTag.on('data' , (chunk2) => 
                { 
                    chunk2Str = strDecoder.write(chunk2);
                    chunkStr = chunkStr.replace("{{" + nameArray[numOfName++] + "}}", chunk2Str); 
                    htmlStr.close();
                    htmlStr = fs.createWriteStream(template);
                    htmlStr.write(chunkStr);
                })
            }
        }  
        while(isExist);
    });
});


//#4
const nameDir = 'assets';
const parentDir = path.join(__dirname, nameDir);
const copyOfPD = path.join(newDir, nameDir);
fs.mkdir(newDir, {recursive: true }, (err) => { if(err) throw err});
fs.mkdir(copyOfPD, {recursive: true }, (err) => { if(err) throw err});
fs.readdir( parentDir, {encoding:'utf8', withFileTypes: true}, (err, files) => { copyDir(files, parentDir, copyOfPD);});
function copyDir(files, directName, copyOfPD)
{
    for(let i = 0; i < files.length; ++i) 
    {
        if(files[i].isFile()) 
        {
            fs.copyFile(path.join(directName, files[i].name), path.join(copyOfPD, files[i].name), (err) =>{ if(err) throw err; } );
        }
        else if(files[i].isDirectory())
        {
            const foundDir = path.join(directName, files[i].name);
            const newSaveDir = path.join(copyOfPD, files[i].name);
            fs.mkdir(newSaveDir, {recursive: true }, (err) => { if(err) throw err});
            fs.readdir(foundDir,{withFileTypes: true}, (err,files) => {copyDir(files, foundDir, newSaveDir)});
        }
    }
}

//#5
const stylesDir = path.join(__dirname, 'styles');
const style = fs.createWriteStream(path.join(newDir, 'style.css'));
fs.readdir(stylesDir, {withFileTypes: true}, (err,files) => {checkInFolder(err, files, stylesDir)});
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
            fileRead.pipe(style);
        }
    }
}