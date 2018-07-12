const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    }
});
const User = mongoose.model("User",userSchema);


/**
 * Register a new user
 * @param {Model} User The user to register
 * @returns {Promise}
 */
User.register = (user)=>{
    return User.create(user);
};
/**
 * Compare a password and a hash
 * @param {String} candidatePassword 
 * @param {String} hash 
 * @returns {Boolean} isMatch Whether the password and the hash match
 */
User.comparePasswords = async (candidatePassword,hash)=>{
    let isMatch = await bcrypt.compare(candidatePassword,hash);
    return isMatch;
};


module.exports = User;