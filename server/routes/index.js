const express = require('express');
const router = express.Router();
const os = require('os');

let Data = require('../mongoose/data-model');

router.post('/', function (req, res, next) {

    let newData = Data({host: os.hostname(), req_host: req.hostname, req_ip: req.header('x-real-ip')});

    newData.save()
        .then((data) => {
            return Data.find().sort('-date').limit(10).exec();
        })
        .then((list) => {
            res.json(list)
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = router;
