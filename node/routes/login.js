// Login API Handler

const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/', function(req, res, next) {
    // Connect to database.  I thought it would be nice to define con at the top
    // of the file, but more than one login request does not work unless it is
    // defined here. Hell if I know why that is.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    // Get request fields.
    const req_user = req.body["username"];
    const req_pass = req.body["password"];

    // Connect to database.
    con.connect(function(err) {
        if (err) {
            console.log(`Database connection error: ${err.stack}`);
            return;
        }

        // Query for user.
        const query = "select * from accounts where username=?;";
        con.query(
            query, [req_user],
            function(err, result) {
                if (err) {
                    console.log(`Database query error: ${err.stack}`);
                    return;
                }

                // Verify that we received some result.
                if (result.length > 0) {

                    // Get query fields.
                    const uid      = result[0].user_id;
                    const username = result[0].username;
                    const hash     = result[0].password;

                    // Verify password hash.
                    bcrypt.compare(
                        req_pass, hash,
                        function(err, success) {
                            if (err) {
                                console.log(`Password verification error: ${err.stack}`);
                                return;
                            }
                            if (success)
                                // Verification successful!
                                res.json({status: "ok",
                                          uid: uid,
                                          username: username,
                                          hash: hash});
                            else
                                // Bad password.
                                res.json({status: "badpass"});
                        }
                    );
                }
                else {
                    // No result, username is invalid.
                    res.json({status: "baduser"});
                }
            });
    });
});

module.exports = router;
