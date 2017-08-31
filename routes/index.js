const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get(['/', '/login', '/room/:roomId?'], function(req, res, next) {
  res.sendFile(path.join(__dirname, ))
});

module.exports = router;
