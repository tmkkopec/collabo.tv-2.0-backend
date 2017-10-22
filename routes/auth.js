const express = require('express');
const router = express.Router();

const cookieExpiration = 600000;

/**
 * performs dummy login
 */
router.get('/join', function (req, res) {
    const query = req.query.nickname.split('@');
    res.cookie('nickname', query[0], {expires: new Date(Date.now() + cookieExpiration)});
    res.cookie('roomId', query[1], {expires: new Date(Date.now() + cookieExpiration)});
    res.json({
        nickname: query[0],
        roomId: query[1]
    });
});

/**
 * checks if user is authenticated
 */
router.get('/user', function (req, res) {
    const nickname = req.cookies.nickname;
    const roomId = req.cookies.roomId;
    const authenticated = typeof nickname !== 'undefined' && typeof roomId !== 'undefined';

    res.status(authenticated ? 200 : 401)
        .json({authenticated: authenticated});
});

/**
 * dummy logout
 */
router.get('/logout', function (req, res) {
    res.clearCookie('nickname')
        .clearCookie('roomId')
        .json({status: 'OK'});
});

module.exports = router;
