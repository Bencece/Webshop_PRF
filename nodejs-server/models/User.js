const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = User