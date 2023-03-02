var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    let fName = req.body["fname"];
    let lName = req.body["lname"];
    let email = req.body["email"];
    let username = req.body["username"];
    let password = req.body["password"];
    let pass2 = req.body["passCheck"];
    for (let key in req.body) {
        console.log(req.body[key]);
    }
    res.send(`Hello, world! You entered \n ${fName} \n ${lName}\n ${email}\n ${username}\n ${password}\n ${pass2}.`);
});

module.exports = router;
