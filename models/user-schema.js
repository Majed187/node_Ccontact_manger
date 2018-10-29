const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    admin: Boolean
});

module.exports = mongoose.model('Users', User);
