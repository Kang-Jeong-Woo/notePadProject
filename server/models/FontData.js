const mongoose = require('mongoose');

const fontDataSchema = mongoose.Schema({

    userId: {
        type: String,
        trim: true
    },
    content: {
        type: String
    },
    pinned: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    style: {
        type: String,
        default: ""
    },
    color: {
        type: String    
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
    },
    degree: {
        type: Number
    }

})

const FontData = mongoose.model("FontData", fontDataSchema);

module.exports = { FontData }