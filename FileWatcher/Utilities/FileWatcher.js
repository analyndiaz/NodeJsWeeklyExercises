const EventEmitter = require('events');
const fsPromise = require('fs/promises');
const fs = require('fs');
const path = require('path');

const EXTENSION = '.txt';

class FileWatcher extends EventEmitter{
    watchDir = (name, dir) => {
        console.log(`Watching path: ${dir}`);
        fs.watch(dir, { recursive: true }, 
            (event, filename) => {
                if(event === 'change'){
                    if(path.extname(filename).toLowerCase() === EXTENSION)
                        this.readFile(name.toLowerCase(), dir, filename);
                }
               
        })
    }

    readFile = async (name, dir, filename) => {
        const data = await (await fsPromise.readFile(path.join(dir,filename), 'utf8')).toLowerCase();
        if(data.indexOf(name) !== -1) {
            this.emit('nameFoundOnFile', {
                filename
            });
        }
    }
}

module.exports = FileWatcher;