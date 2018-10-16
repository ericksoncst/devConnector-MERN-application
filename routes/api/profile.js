const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport  = require('passport');  

//load profile model
const Profile = require('../../models/Profile');
//load user model
const User = require('../../models/User');

//@route GET api/profile/test
//@access public
router.get('/test', (req, res) => res.json(
    {msg: "Profile Works"}
));


//@route GET api/profile/profile
//@desc Get current user profile
//@access private
router.get('/' ,passport.authenticate(
    'jwt', 
    {session: false}), 
    (req, res) => {

    const errors = {};

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile) {
            errors.noprofile = "There's no profile for this user!";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;