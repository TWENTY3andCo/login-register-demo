/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 * @param {Function} next 
 */

function isUserAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error','You need to login to access this area');
        res.redirect('/login');
    }
}

module.exports = isUserAuthenticated;