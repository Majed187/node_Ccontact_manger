const jwt = require('jsonwebtoken');
const config = require('../config');
const decodeToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({
            message: 'No token provided.'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Failed to authenticate token.' });
        } else {
            req.decoded = decoded;
            next();
        }
    });
};
module.exports = decodeToken;
