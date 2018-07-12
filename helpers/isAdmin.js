/**
 * @module isAdmin
 * This module acts as a middleware which checks if a user tries 
 * to access a resource which is only available for admins
 * @param {IncomingMessage} req Request to resource
 * @param {ServerReponse} res Server response
 * @param {Functions} next The next middleware to execute
 */

function isAdmin(req, res, next) {

    if(!req.isAuthenticated()){
        req.flash('error','You need to login to view this page');
        res.redirect('/login');
    }else if(req.user.role != 'admin'){
        req.flash('error','This area is only for admins');
        res.redirect('/');
    }else{
        //User is admin.Execute next middleware
        return next();
    }
    
}

module.exports = isAdmin;