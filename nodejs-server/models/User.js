const mongoose = require('mongoose');

const User = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = User = mongoose.model("users", User)