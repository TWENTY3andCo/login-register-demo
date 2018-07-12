/**
 * @module logout
 */

const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    req.flash('success','You have been logged out');
    req.logout();
    res.redirect('/');
});
module.exports = router;