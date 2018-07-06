let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let data = new Schema({
    host: {type: String},
    req_host: {type: String},
    req_ip: {type: String},
    date: {type: Date, default: Date.now}
});

let Data = mongoose.model('Data', data);

module.exports = Data;