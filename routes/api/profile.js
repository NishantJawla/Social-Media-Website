const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load user model
const User = require('../../models/User');
//load  Profile model
const Profile = require('../../models/Profile');
//@route get /api/profile/test
//@desc use to test profile route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "profile route is working"
}));
//@route get /api/
//@desc Use to get current user profile
//@access private
router.get('/',passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    }).then((profile) =>{
        const errors = {};
        if(!profile){
            errors.userprofile = 'The User profile is not available';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch((err) => res.json(err));
});
module.exports = router;