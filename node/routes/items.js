// Event API handler.

const express = require("express");
const mysql   = require("mysql");
const router  = express.Router();
router.post('/', requestHandler);
module.exports = router;

// Handle events API request.
function requestHandler(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const itemID = req.body["itemID"];
    const user = req.body["username"];
    // Database connection.
    const con = mysql.createConnection({
        host: "mariadb",
        port: "3306",
        user: "root",
        password: "root",
        database: "sitedb"
    });

    // Connect to database. Handle queries in callback.
    con.connect(getItem(res, con, itemID, user));
}

function getItem(res, con, itemID, user) {
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
                if(result[0].stock > 0) {
                    const newStock = result[0].stock-1;
                    var update = `UPDATE items SET stock=${newStock} WHERE item_id=${itemID}`;
                    con.query(update, function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                    databaseLog(con, `1 ${result[0].name} adopted by user ${user}.`)
                    res.json({
                        status: "ok",
                        stock: newStock,
                        name: result[0].name
                    });
                }
                else{
                    res.json({
                        status: "ok",
                        stock: "-1",
                        name: result[0].name
                    });
                }
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