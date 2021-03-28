const express = require('express');
const router = express.Router();
//@route get /api/profile/test
//@desc use to test profile route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "profile route is working"
}));

module.exports = router;