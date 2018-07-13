/**
 * @module main
 * Load a predifined list of users and register them 
 */

const mongoose = require('mongoose');
const dburl = require('../configs/db');
const users = require('./users');
const User = require('../models/User');
mongoose.connect(dburl);
const bcrypt = require('bcrypt');
console.log(`You are about to register ${users.length}`);
let registrations = users.map(async user => {
    let password = await bcrypt.hash(user.password, 10);
    let email = user.email;
    let role = user.role || user;
    let name = user.name;
    let newUser = new User({
        name,
        email,
        password,
        role
    });
    return User.register(newUser);
});

Promise.all(registrations)
    .then(() => {
        console.log('Users have been registered')
        process.exit(0);
    })
    .catch(e => {
        console.log(e)
        process.exit(1);
    });
