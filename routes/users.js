const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Boom = require('boom');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user-schema');
const UserService = require('../service/service-user');
const decodeToken = require('../middelware/decodedToken');
const validateUser = require('../middelware/validate-user');
router.get('/', decodeToken, validateUser, async (req, res) => {
    const user = await UserService.retrieve();
    res.json(user);
});

router.post('/singup', async (req, res, next) => {
    if (!req.body.user_name || !req.body.password) {
        next(Boom.badRequest('Missing something please check  your input again'));
    }
    const rounds = 10;
    const hash = await bcrypt.hash(req.body.password, rounds);

    const user = new User({
        user_name: req.body.user_name,
        password: hash
    });
    try {
        await user.save();
        const payload = { id: user.id, name: user.user_name };
        jwt.sign(payload, config.secret, (err, token) => {
            res.json({
                success: true,
                token
            });
        });
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 110000) {
            next(Boom('user name token '));
        }
        return res.status(400).json({ err });
    }
});

router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const user = await User.findOne({ user_name });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        const payload = { id: user.id, name: user.user_name };
        jwt.sign(payload, config.secret, (err, token) => {
            res.json({
                success: true,
                token
            });
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
