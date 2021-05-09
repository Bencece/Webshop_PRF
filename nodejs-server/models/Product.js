const mongoose = require('mongoose');

const Product = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    prize: {
        type: Number
    },
    image: {
        type: String,
        default: "../assets/note1.jpg"
    }
});

module.exports = Product = mongoose.model("products", Product)