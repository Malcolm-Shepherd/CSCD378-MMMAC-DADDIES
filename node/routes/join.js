// Registration API handler.

const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.post('/', function(req, res, next) {
    // Database connection parameters.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    // Get form fields.
    const firstName = req.body["firstname"];
    const lastName  = req.body["lastname"];
    const email     = req.body["email"];
    const username  = req.body["username"];
    const password  = req.body["password"];

    // Connect c
    con.connect(function(err) {
        if (err) {
            console.log(`Database connection error: ${err.stack}`);
            res.json({status: "error"});
            return;
        }

        // Hash password using bcrypt.
        bcrypt.hash(password, 10, function(err, hash) {
            // Password hashing should never fail so throw if it does.
            if (err) throw err;

            // Try to insert username and password into accounts table.
            const query = "insert into accounts (username, password) values (?, ?);";
            con.query(
                query, [username, hash],
                function(err, result) {
                    if (err) {
                        console.log(`Account insertion error: ${err.stack}`);
                        res.json({status: "error"});
                        return;
                    }
                });

            // Try to insert other user into user table. Is there a better way
            // to get the user id than to query for it?
            const query2 = "select user_id from accounts where username=?;";
            con.query(
                query2, [username],
                function(err, result) {
                    if (err) {
                        console.log(`uid query error: ${err.stack}`);
                        res.json({status: "error"});
                        return;
                    }

                    if (result.length > 0) {
                        const uid = result[0].user_id;

                        const query3 = "insert into users values (?, ?, ?, ?);";
                        con.query(
                            query3, [uid, firstName, lastName, email],
                            function(err, result) {
                                if (err) {
                                    console.log(`User insertion error: ${err.stack}`);
                                    res.json({status: "error"});
                                    return;
                                }

                                // Success
                                res.json({status: "ok"});
                            }
                        );
                    }
                }
            );
        });
    });
});

module.exports = router;
