const mongoose = require('mongoose');

const NameSchema = require('./name-schema');

const ContactSchema = new mongoose.Schema({
    name: {
        type: NameSchema,
        required: true
    },
    phone_nums: [String],
    emails: [String],
    birth_date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

ContactSchema.virtual('address', {
    ref: 'Address',
    localField: '_id',
    foreignField: 'contact '
});

module.exports = mongoose.model('Contact', ContactSchema);
