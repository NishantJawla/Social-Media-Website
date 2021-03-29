const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//@route get /api/users/test
//@desc use to test user route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "User route is working"
}));
//@route get /api/users/register
//@desc use to register a user
//@access public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email}).then( user => {
        if(user) {
            return res.json({
                email: "User with this email already registered"
            });
        }
        const avatar = gravatar.url(req.body.email,{
        s: '200', //size
        r: 'pg', //rating
        d: 'mm' //default
        })
        const newUser = new User ({
            email: req.body.email,
            name: req.body.name,
            avatar,
            password: req.body.password
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash,
                newUser.save().then(user => {
                    res.json(user);
                }).catch(err => {
                    res.json(err);
                })
            })
        })
    });
})
module.exports = router;