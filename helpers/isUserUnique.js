/**
 * @module isUserUnique
 * Checks if there is already a user with a given email
 */
const User = require('../models/User');
/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse}} res 
 * @param {Function} next 
 */
async function isUserUnique(req,res,next){
    let email = req.body.username;
    let user = await User.findOne({email});
    if(!user){
        next();
    }else{
        req.flash('error','There is already a user with the email '+email);
        res.redirect('/register');
    }
}

module.exports = isUserUnique;