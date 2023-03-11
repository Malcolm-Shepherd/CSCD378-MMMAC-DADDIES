// Registration API handler.

const bcrypt  = require("bcrypt");
const express = require("express");
const mysql   = require("mysql");
const router  = express.Router();
router.post('/', requestHandler);
module.exports = router;

// Handle registration API request.
function requestHandler(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    // Database connection.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    // Connect to database. Handle queries in callback.
    con.connect(registerUser(req, res, con));
}


// Register a user.
function registerUser(req, res, con) {
    return function(err) {
        if (err) {
            // Database connection error.
            console.log(`Database connection error: ${err}`);
            res.json({status: "error"});
            return;
        }

        // Hash password and insert into accounts.
        const password = req.body['password'];
        bcrypt.hash(password, 10, insertAccount(req, res, con));
    };
}


// Insert a user into the accounts table.
function insertAccount(req, res, con) {
    return function(err, hash) {
        // Password hashing error.
        if (err) throw err;

        const username = req.body['username'];

        // Insert username and password hash into accounts table.
        const query = "insert into accounts (username, password) values (?, ?);";
        con.query(query, [username, hash], (err, result) => {
            if (err) {
                // Insertion error.
                databaseLog(con, `Account insertion error: ${err}`);
                res.json({status: "error"});
                return;
            }

            // Insert other user info into accounts.
            insertUser(req, res, con);
        });
    };
}


// Insert user info into the users table.
function insertUser(req, res, con) {

    const firstName = req.body["firstname"];
    const lastName  = req.body["lastname"];
    const email     = req.body["email"];
    const username  = req.body["username"];

    const query = "select user_id from accounts where username=?;";
    con.query(query, [username], (err, result) => {
        if (err) {
            databaseLog(con, `uid query error: ${err}`);
            res.json({status: "error"});
            return;
        }
        if (result.length > 0) {
            const uid = result[0].user_id;
            const query2 = "insert into users values (?, ?, ?, ?);";
            con.query(query2, [uid, firstName, lastName, email],
                      (err, result) => {
                          if (err) {
                              databaseLog(`User insertion error: ${err}`);
                              res.json({status: "error"});
                              return;
                          }
                          databaseLog(con, `User ${username} registered.`);
                          res.json({status: "ok"});
                      });
        }
    });
}


// Log a message to the console and insert it into the database.
function databaseLog(con, message) {
    console.log(message);
    const query = "insert into log (message) values (?);";
    con.query(query, [message], (err) => {
        if (err)
            console.log(`Database log error: ${err}`);
    });
}
