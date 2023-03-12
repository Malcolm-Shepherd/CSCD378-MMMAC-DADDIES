// Logout event logging.

const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
router.post('/', requestHandler);
module.exports = router;

function requestHandler(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const username = req.body["username"];
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });
    con.connect(logLogout(con, username));
}

function logLogout(con, user) {
    return function(err) {
        if (err) {
            console.log(`Database connection error: ${err}`);
            return;
        }
        const message = `User ${user} logged out.`;
        databaseLog(con, message);
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
