var mongoose = require('mongoose');

//SCHEMA SETUP simple campground
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
    },
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        username : String
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);