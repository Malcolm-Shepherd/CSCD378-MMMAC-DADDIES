// Event API handler.

const express = require("express");
const mysql   = require("mysql");
const router  = express.Router();
router.post('/', requestHandler);
module.exports = router;

// Handle events API request.
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
    con.connect(getEvents(res, con));
}

function getEvents(res, con) {
    return function(err) {
        if (err) {
            console.log(`Database connection error: ${err}`);
            res.json({status: "error"});
            return;
        }

        const query = "select * from events;";
        con.query(query, (err, result) => {
            if (err) {
                console.log(`Event query error: ${err}`);
                res.json({status: "error"});
                return;
            }
            if (result.length > 0) {
                console.log(result);
                res.json({status: "ok", data: result});
            }
        });
    };
}
