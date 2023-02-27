const mongoose = require('mongoose');

const postItsSchema = mongoose.Schema({

    userId: {
        type: String,
        trim: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    pinned: {
        type: Boolean,
        default: false
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