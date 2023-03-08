const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    // Get form fields.
    const firstName = req.body["firstname"];
    const lastName  = req.body["lastname"];
    const email     = req.body["email"];
    const username  = req.body["username"];
    const password  = req.body["password"];

    // Hash password using bcrypt.
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            console.log(`Password hash error: ${err.stack}`);
            return;
        }
        res.json({status: "ok", hash: hash});
    });
});

module.exports = router;
