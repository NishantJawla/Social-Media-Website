const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys');
const passport = require('passport');
//load validations
const validateregisterinput = require('../../validations/register');
const validatelogininput = require('../../validations/login');
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
    //validating user input data
    const {errors,isValid} = validateregisterinput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email}).then( user => {
        if(user) {
            errors.email = 'User with this email already registered'
            return res.json(errors); 
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
//@route get /api/users/login
//@desc use to login by a user / set up a token in the user browser
//@access public
router.post('/login', (req, res) => {
    const {errors,isValid} = validatelogininput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const mail = req.body.email;
    const password = req.body.password;
    User.findOne({email: mail}).then(user => {
        if(!user){
            errors.email = 'user email not found';
            return res.status(404).json(errors)
        }else{
            bcrypt.compare(password, user.password).then(isValid => {
                if(isValid){
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload,
                        keys.secretkey,
                        {expiresIn : 3600},
                        (err,token) => {
                            return res.json({
                                status: 'success',
                                token: 'Bearer '+token
                            })
                        })
                }else{
                    errors.password = 'Invalid password'
                return res.status(400).json(errors)
                }
            })
        }
    })
})
//@route get /api/users/current 
//@desc Returns a current user
//@access private
router.get('/current',passport.authenticate('jwt',{session: false}),(req, res) =>{
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})
module.exports = router;