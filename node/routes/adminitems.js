// Event API handler.

const express = require("express");
const mysql   = require("mysql");
const router  = express.Router();
router.post('/', requestHandler);
module.exports = router;

// Handle events API request.
function requestHandler(req, res, next) {
    console.log("Update Starting");
    res.header("Access-Control-Allow-Origin", "*");
    const itemID = req.body["itemID"];
    const stock = req.body["stock"];
    // Database connection.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });
    // Connect to database. Handle queries in callback.
    con.connect(updateItem(res, con, itemID, stock));
}

function updateItem(res, con, itemID, stock) {
    return function(err) {
        if (err) {
            console.log(`Database connection error: ${err}`);
            res.json({status: "error"});
            return;
        }

        const query = "select * from items where item_id=?;";
        con.query(query, [itemID], (err, result) => {
            if (err) {
                console.log(`Event query error: ${err}`);
                res.json({status: "error"});
                return;
            }
            if (result.length > 0) {
                const update = `UPDATE items SET stock=${stock} WHERE item_id=${itemID}`;
                con.query(update, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
                databaseLog(con, `Updated ${result[0].name}'s stock from ${result[0].stock} to ${stock}.`)
                res.json({
                    status: "ok",
                    oldStock: result[0].stock,
                    stock: stock,
                    name: result[0].name
                });
            }
        });
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