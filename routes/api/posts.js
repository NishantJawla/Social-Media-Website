const express = require('express');
const router = express.Router();
//@route get /api/posts/test
//@desc use to test posts route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "Post route is working"
}));

module.exports = router;