const fs = require('fs');
const path = require('path');

function getFile(file) {
  return fs.readFileSync(path.resolve(__dirname, file));
}

exports.getFile = getFile;
