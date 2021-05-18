const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    quantity: {
        type: Number,
        default: 1
    },
    itemid: {
        type: Number
    }
});

module.exports = Product