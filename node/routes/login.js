var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');

/* GET users listing. */
router.post('/', function(req, res, next) {

    let Username = req.body["username"];
    let password = req.body["password"];
    for (let key in req.body) {
        console.log(req.body[key]);
    }
    //res.send(`Hello, world! You entered ${Username} ${password}`);

    let hash = crypto.createHash('sha512').update(password).digest('hex');

    var con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    con.connect(function(err) {
        if (err) throw err;
        let query = "SELECT * FROM accounts WHERE username=? and password=?";
        con.query(query, [Username, hash], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
});

module.exports = router;
