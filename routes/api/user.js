const express = require('express');
const router = express.Router();
//@route get /api/users/test
//@desc use to test user route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "User route is working"
}));

module.exports = router;