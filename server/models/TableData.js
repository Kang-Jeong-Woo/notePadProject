const mongoose = require("mongoose");

const tableDataSchema = mongoose.Schema({

    userId: {
            type: String,
            trim: true
    },
    cotents: {
        type: Object
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

const TableData = mongoose.model('TableData', tableDataSchema);

module.exports = { TableData }