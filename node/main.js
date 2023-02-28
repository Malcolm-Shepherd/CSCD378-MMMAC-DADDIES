for (let i = 0; i < 100; i++) {
    console.log("Hello, world!");
}

const crypto = require('crypto');
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "mariadb",
    port: "3306",
    user: "root",
    password: "root",
    database: "sitedb"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");

    let username = 'TestUser';
    let password = 'testpass';
    let hash = crypto.createHash('sha512').update(password).digest('hex');
    let query = `insert into accounts (username, password) values ('${username}', '${hash}')`;

    con.query(query, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});