const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const con = mysql.createConnection({
    host: "mariadb",
    port: "3306",
    user: "root",
    password: "root",
    database: "sitedb"
});

// Login API handler.
router.post('/', function(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    // Spy on the result.
    for (let key in req.body) {
        console.log(req.body[key]);
    }
    // Query database for user.
    con.connect(function(err) {
        if (err) throw err;
        const query = "select * from accounts where username=?;";
        con.query(query, [username], function (err, result) {
            if (err) throw err;
            console.log(result);
            // Verify result exists.
            if (result[0].password) {
                // Verify password hash.
                bcrypt.compare(password, result[0].password,
                               function(err, success) {
                                   if (success)
                                       res.send("Authentication successful!");
                                   else
                                       res.send("Invalid Credentials.");
                });
            }
        });
    });
});

module.exports = router;
