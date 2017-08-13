var mongoose = require('mongoose');

var imgSchema = new mongoose.Schema({
    path :{
        type: String,
        required: true,
        trim: true
    },
    originalname: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Image", imgSchema);