/**
 * @module register
 * Defines what happens on /register
 */


const User = require('../models/User');

//Load admin list
const admins = require('../configs/admins');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.render('register', {
        title: 'Register'
    });
});

router.post('/', async (req, res, next) => {

    let username = req.body.username;
    let name = req.body.name;
    let password = req.body.password;
    //Check if email,password or name fields are empty
    req.checkBody('username', 'Email is required').trim().notEmpty();
    req.checkBody('name', 'Name is required').trim().notEmpty();
    req.checkBody('password', 'Password is required');

    let errors = req.validationErrors();
    if (errors) {
        res.render('register', { title: 'Register', errors });
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        //Check if current email is in the admin list
        let role = admins.includes(username)?'admin':'user';
        let user = new User({
            email: username,
            name,
            role,
            password:hashedPassword
        });
        console.log('User',user)
        try{
            await User.register(user);
            req.login(user,(err)=>{
                req.flash('error', 'Registered new user.You can now login');
                res.redirect('profile');
            });
            
        }catch(e){
            console.log('Error occured');
            console.log(e);
            req.flash('error','Failed to register user');
            res.redirect('/register');

        }
        


    }


});

module.exports = router;