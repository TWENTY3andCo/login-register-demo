/** @module login
 * Defines what happens on /login
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
router.get('/', (req, res, next) => {
    if (req.user) {
        //If user is already logged in redirect to profile
        res.redirect('/profile');
    } else {
        res.render('login', {
            title: 'Login'
        });
    }
});

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await User.findOne({email:username});
        if (!user) {
            return done(null, false, {
                message: 'No user found'
            })
        }
        let isMatch = await User.comparePasswords(password, user.password);
        console.log(isMatch)
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, {
                message: 'Wrong password'
            });
        }
    } catch (e) {
        //Well shit happens :) deal with it
        console.error(e);
        res.sendStatus(404);
    }
}));

passport.serializeUser((user, done) => {
    let serializedUser = {
        _id: user._id,
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.username,
    };
    done(null, serializedUser);
});

passport.deserializeUser(async (serializedUser, done) => {
    let user = null;
    let error = null;
    try {
        user = await User.findById(serializedUser.id);
    } catch (e) {
        error = e;
    } finally {
        done(error, user);
    }
});

router.post('/',(req,res,next)=>{
    const options = {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    };
    passport.authenticate('local', options)(req, res, next);
});


module.exports = router;
