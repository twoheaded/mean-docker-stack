const nconf = require('nconf');
const path = require('path');

nconf
    .argv()
    .env()
    .file({
        file: path.join(process.cwd(), 'run', 'secrets', 'config.json')
    })
    .file({
        file: path.join(process.cwd(), 'config.json')
    });

module.exports = nconf;