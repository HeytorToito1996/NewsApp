const secretToken = process.env.SECRET_TOKEN;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role:{
        type: String,
        default: 'User',
    }
});

User.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.methods.generateWebToken = function(){
    return jwt.sign({_id: this._id},secretToken,{
        expiresIn: '1h'
    });
};

module.exports = mongoose.model('User', User);
