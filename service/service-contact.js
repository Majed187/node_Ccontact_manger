const mongoose = require('mongoose');

const Contact = require('../models/contact-schema');
mongoose.connect('mongodb://localhost/teams');
const db = mongoose.connection;

db.on('error', console.error);

class ContactService {
    static async create(data) {
        const newData = new Contact(data);
        return await newData.save();
    }

    static async retrieve(user, id) {
        let contact;
        if (!user) {
            throw new Error('Cannot retireve contact');
        }
        if (id) {
            contact = await Contact.findOne({
                _id: id,
                user
            }).exec();
        } else {
            contact = await Contact.find({
                user
            }).exec();
        }
        if (!contact) {
            throw new Error('Cannot retireve contact');
        }
        return contact;
    }

    static async update(id, data) {
        const contact = await Contact.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!contact) {
            throw new Error('Cannot retireve data');
        }

        return contact;
    }
    static async delete(id) {
        const data = await Contact.findByIdAndRemove(id).exec();
        if (!data) {
            throw new Error(`Cannot find the id :${id} `);
        }
        return data;
    }
}

module.exports = ContactService;
