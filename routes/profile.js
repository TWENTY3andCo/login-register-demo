/**
 * @module profile
 * 
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const isAuthenticated = require('../helpers/isUserAuthenticated');

router.get('/',isAuthenticated,async (req,res,next)=>{
    let email = req.user.email;
    let user = await User.findOne({email});
    res.render('profile',{title:'Profile',user});
});


module.exports = router;