const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    // Get form fields.
    const firstName = req.body["fname"];
    const lastName  = req.body["lname"];
    const email     = req.body["email"];
    const username  = req.body["username"];
    const password  = req.body["password"];
    const password2 = req.body["passCheck"];

    // Hash password using bcrypt.
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            console.log(`Password hash error: ${err.stack}`);
            return;
        }
        res.send(`
You entered:
${firstName}
${lastName}
${email}
${username}
${password}
${password2}
Password hash:
${hash}`);
    });
});

module.exports = router;
