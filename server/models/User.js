const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    nick: {
        type: String,
        maxlength: 10
    },
    role: {
        type: Number,
        default: 0
    }


})

const User = mongoose.model('User', userSchema)

module.exports = { User }