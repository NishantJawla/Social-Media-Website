const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load user model
const User = require('../../models/User');
//load  Profile model
const Profile = require('../../models/Profile');
//loading validations
const validateprofileinput = require('../../validations/profile')
//@route get /api/profile/test
//@desc use to test profile route
//@access public
router.get('/test', (req, res) => res.json({
    "msg": "profile route is working"
}));
//@route get /api/profile/handle/:handle
//@desc get user by handle
//@access public
router.get('/handle/:handle', (req, res) =>{
    const errors = {};
    Profile.findOne({handle: req.body.handle})
    .populate('User',['name','avatar'])
    .then(profile =>{
        if(!profile){
            errors.noprofile = "There is no profile available with this handle";
            return res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.json(err));
})
//@route get /api/
//@desc Use to get current user profile
//@access private
router.get('/',passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
    })
    .populate('User','name')
    .then((profile) =>{
        if(!profile){
            errors.userprofile = 'The User profile is not available';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch((err) => res.json(err));
});
//@route post /api/
//@desc Use to get current user profile
//@access private
router.post('/',passport.authenticate('jwt', {session: false}), (req, res) => {
   const {errors,isValid} = validateprofileinput(req.body);
   if(!isValid){
       return res.status(400).json(errors);
   }
   const profileFields = {};
   profileFields.user = req.user.id;
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
   if(req.body.company) profileFields.company = req.body.company;
   if(req.body.website) profileFields.website = req.body.website;
   if(req.body.location) profileFields.location = req.body.location;
   if(req.body.bio) profileFields.bio = req.body.bio;
   if(req.body.status) profileFields.status = req.body.status;
   if(typeof req.body.skills !== undefined) {
       profileFields.skills = req.body.skills.split(',');
   }
   profileFields.social = {};
   if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
   if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
   if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
   if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
   Profile.findOne({user: req.user.id}).then(profile => {
       if(profile){
           //update profile
           Profile.findOneAndUpdate({user: req.user.id}, {$set : profileFields},{new: true}).then(profile => {
               res.json(profile);
           });
       }
       else{
           //create profile
           Profile.findOne({handle: req.body.handle}).then(profile => {
               if(profile){
                   errors.handle = 'Handle name is already in use'
                   res.status(400).json(errors);
               }
               new Profile(profileFields).save().then(profile => {
                   res.send(profile);
               })
           })
       }
   })
});
module.exports = router;