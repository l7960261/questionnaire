const params = Array.prototype.slice.call(process.argv).slice(2);
const path = require('path');
const fs = require('fs');

const apiKey = params[0];
const environmentPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

fs.readFile(environmentPath, { encoding: 'utf8' }, (err, data) => {
  const res = data.replace("apiKey: ''", `apiKey: \'${apiKey}\'`);
  fs.writeFile(environmentPath, res, { encoding: 'utf8' }, err => {});
});
