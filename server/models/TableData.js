const mongoose = require("mongoose");

const tableDataSchema = mongoose.Schema({

    userId: {
            type: String,
            trim: true
    },
    contents: {
        type: Object
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
        type: Object,
    },
    color: {
        type: Object,
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

const TableData = mongoose.model('TableData', tableDataSchema);

module.exports = { TableData }