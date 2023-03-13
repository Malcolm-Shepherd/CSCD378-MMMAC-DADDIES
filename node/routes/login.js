// Login API Handler

const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
router.post('/', requestHandler);
module.exports = router;

// Handle an API request.
function requestHandler(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    // Get request fields.
    const req_user = req.body["username"];
    const req_pass = req.body["password"];

    // Database connection.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    // Connect to database. Handle queries in callback.
    con.connect(verifyUser(res, con, req_user, req_pass));
}


// Verify user credentials.
function verifyUser(res, con, user, pass) {
    return function(err) {
        if (err) {
            // Database connection error.
            console.log(`Database connection error: ${err}`);
            res.json({status: "error"});
            return;
        }

        // Query for user. Handle response in callback.
        const query = "select * from accounts where username=?;";
        con.query(query, [user], queryHandler(res, con, pass));
    };
}


// Handle query response. Verify password.
function queryHandler(res, con, pass) {
    return function(err, result) {
        if (err) {
            // Database query error.
            databaseLog(con, `Database query error: ${err}`);
            res.json({status: "error"});
            return;
        }

        // Verify that we received a result.
        if (result.length > 0) {
            // Get query fields.
            const uid      = result[0].user_id;
            const username = result[0].username;
            const hash     = result[0].password;

            // Verify password hash.
            bcrypt.compare(pass, hash, (err, success) => {
                if (err) throw err;
                if (success) {
                    // Verification successful!
                    databaseLog(con, `User ${username} login success.`);
                    res.json({
                        status: "ok",
                        uid: uid,
                        username: username,
                        hash: hash
                    });
                }
                else {
                    // Bad password.
                    res.json({status: "badpass"});
                }
            });
        }
        else {
            // Bad username.
            res.json({status: "baduser"});
        }
    };
}


function databaseLog(con, message) {
    console.log(message);
    const query = "insert into log (message) values (?);";
    con.query(query, [message], (err) => {
        if (err)
            console.log(`Database log error: ${err}`);
    });
}
