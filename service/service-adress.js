const mongoose = require('mongoose');

const Address = require('../models/adress-schema');
mongoose.connect('mongodb://localhost/teams');
const db = mongoose.connection;

db.on('error', console.error);

class AdressService {
    static async create(data) {
        const newData = new Address(data);
        return await newData.save();
    }

    static async retrieve(id, addressId) {
        let adress;

        if (id) {
            adress = await Address.findById(id)
                .populate('adress')
                .exec();
        } else if (addressId) {
            adress = await Address.find({
                addres: addressId
            });
        } else {
            adress = await Address.find().exec();
        }
        if (!adress) {
            throw new Error('Cannot retireve adress');
        }
        return adress;
    }

    static async update(id, data) {
        const address = await Address.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!address) {
            throw new Error('Cannot retireve data');
        }

        return address;
    }
    static async delete(id) {
        const address = await Address.findByIdAndRemove(id).exec();
        if (!address) {
            throw new Error(`Cannot find the id :${id} `);
        }
        return address;
    }
}

module.exports = AdressService;
