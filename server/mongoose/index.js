const mongoose = require('mongoose');
const config = require('../nconf');

mongoose.Promise = global.Promise;

const options = {
    dbName: config.get('db:dbName') || 'docker',
    user: config.get('db:user'),
    pass: config.get('db:pass'),
};

let reconnections = 0;

let connectWithRetry = function () {
    return mongoose.connect(config.get('db:uri'), options)
        .then(() => {
            console.info("Connected to DB");
        })
        .catch((err) => {
            if (reconnections < 20) {
                reconnections++;
                console.error(`Failed to connect to mongo on startup - retrying in ${reconnections} sec`, err);
                setTimeout(connectWithRetry, reconnections * 1000);
            } else {
                console.error(`Failed to connect to mongo. Exit...`);
                process.exit(1);
            }
        });
};

connectWithRetry();


module.exports = mongoose;