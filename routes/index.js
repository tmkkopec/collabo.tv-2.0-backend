const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get(['/', '/login', '/room/:roomId?'], function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'build', 'index.html'));
});

module.exports = router;
