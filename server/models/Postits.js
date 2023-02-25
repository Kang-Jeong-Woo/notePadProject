const mongoose = require('mongoose');

const postItsSchema = mongoose.Schema({

    serId: {
        type: String,
        trim: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    pinned: {
        type: Boolean
    },
    style: {
        type: String,
        default: ""
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    positionX: {
        type: Number
    },
    positionY: {
        type: Number
    },
    positionZ: {
        type: Number
    }

})

const PostIts = mongoose.model('PostIts', postItsSchema);

module.exports = { PostIts };