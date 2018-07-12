/**
 * @module logout
 */

const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    req.logout();
    req.flash('success','You have been logged out');
    res.redirect('/');
});
module.exports = router;