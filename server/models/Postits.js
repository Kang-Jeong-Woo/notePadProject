const mongoose = require('mongoose');

const postitsSchema = mongoose.Schema({

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

const Postits = mongoose.model('Postits', postitsSchema);

module.exports = { Postits };