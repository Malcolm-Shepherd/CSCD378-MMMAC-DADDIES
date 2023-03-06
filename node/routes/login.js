// Login API Handler

const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/', function(req, res, next) {
    // Get request fields.
    const username = req.body["username"];
    const password = req.body["password"];

    // Connect to database.
    // I thought it would be nice to define con at the top of the file, but more
    // than one login request does not work unless it is defined here. Hell if I
    // know why that is.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    con.connect(function(err) {
        if (err) {
            console.log(`Database connection error: ${err.stack}`);
            return;
        }
        // Query user.
        const query = "select * from accounts where username=?;";
        con.query(
            query, [username],
            function(err, result) {
                if (err) {
                    console.log(`Database query error: ${err.stack}`);
                    return;
                }
                // Verify user exists.
                if (result.length > 0) {
                    // Verify password hash.
                    const hash = result[0].password;
                    bcrypt.compare(
                        password, hash,
                        function(err, success) {
                            if (err) {
                                console.log(`Password verification error: ${err.stack}`);
                                return;
                            }
                            if (success)
                                res.send("Authentication successful!");
                            else
                                res.send("Invalid password.");
                        }
                    );
                }
                else {
                    res.send("User does not exist.");
                }
            });
    });
});

module.exports = router;
