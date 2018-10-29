const mongoose = require('mongoose');

const { Schema } = mongoose;

const NameSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    {
        _id: false,
        toJSON: {
            virtuals: true
        }
    }
);

NameSchema.virtual('full').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = NameSchema;
