const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema ({
    title:{
        type: String,
        required: true,
        unique: true
    },

    text:{
        type: String,
        required: true
    },

    picture:{
        type: String,
    },

    author:{
        type: String,
    },

    postedAt:{
        type :String,
    }
});

module.exports = mongoose.model('Post', Post);