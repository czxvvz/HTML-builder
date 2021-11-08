const fs = require('fs');
const path = require('path');
const nameDir = path.join(__dirname, 'secret-folder');
const dir = fs.readdir( nameDir,
    {encoding:'utf8', withFileTypes: true}, 
    (err, files) => 
    {
        for(let i = 0; i < files.length; ++i) 
        {
            if(files[i].isFile()) 
            {
                fs.stat( path.join(nameDir, files[i].name) , (err,stats) => 
                {
                    console.log( path.basename(files[i].name, path.extname(files[i].name)) + " - " + 
                    path.extname(files[i].name) + " - " + stats.size + "b") 
                }
                ); 
            }
        }
    });
