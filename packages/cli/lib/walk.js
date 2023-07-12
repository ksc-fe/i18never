const fs = require('fs');
const path = require('path');

const walk = function (source, action = 'convert', filelist = []) {
    if (fs.statSync(source).isDirectory()) {
        let files = fs.readdirSync(source);
        for (let file of files) {
            if (file.startsWith('.') || file == 'node_modules') {
                continue;
            }

            let filePath = path.join(source, file);
            let isDir = fs.statSync(filePath).isDirectory();

            if (isDir) {
                filelist = walk(filePath, action, filelist);
            } else {
                filelist.push(filePath);
            }
        }
    } else {
        filelist.push(source);
    }
    return filelist;
};

module.exports = walk;
