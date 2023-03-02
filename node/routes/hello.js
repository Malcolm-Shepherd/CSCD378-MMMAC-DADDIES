var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let message = req.body["testInput"];
    for (let key in req.body) {
        console.log(req.body[key]);
    }
    res.send(`Hello, world! You entered ${message}.`);
});

module.exports = router;
