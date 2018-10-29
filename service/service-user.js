const mongoose = require('mongoose');

const User = require('../models/user-schema');
mongoose.connect('mongodb://localhost/teams');
const db = mongoose.connection;

db.on('error', console.error);

class UserService {
    static async create(data) {
        const newData = new User(data);
        return await newData.save();
    }

    static async retrieve(id) {
        let user;
        if (id) {
            user = await User.findById(id).exec();
        } else {
            user = await User.find().exec();
        }
        if (!user) {
            throw new Error('Cannot retireve user');
        }
        return user;
    }

    static async update(id, data) {
        const user = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!user) {
            throw new Error('Cannot retireve data');
        }

        return user;
    }
    static async delete(id) {
        const data = await User.findByIdAndRemove(id).exec();
        if (!data) {
            throw new Error(`Cannot find the id :${id} `);
        }
        return data;
    }
}

module.exports = UserService;
