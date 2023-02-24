const mongoose = require('mongoose');

const drawDataSchema = mongoose.Schema({

    userId: {
        type: String,
        trim: true
    },
    saveImage: {
        type: String
    }

})

const DrawData = mongoose.model('DrawData', drawDataSchema);

module.exports = { DrawData };