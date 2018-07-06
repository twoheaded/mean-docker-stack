const mongoose = require('mongoose');
const config = require('../nconf');

mongoose.Promise = global.Promise;

const options = {
    dbName: config.get('db:dbName') || 'docker',
    user: config.get('db:user'),
    pass: config.get('db:pass'),
};

mongoose.connect(config.get('db:uri'), options);

let connection = mongoose.connection;

connection.on('error', function (err) {
    console.error('Connection error:', err.message);
});

connection.once('open', function callback() {
    console.info("Connected to DB");
});

module.exports = mongoose;