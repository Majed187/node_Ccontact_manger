const User = require('../models/user-schema');

const validateUser = async (req, res, next) => {
    const { id } = req.decoded;

    try {
        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(401).json({ message: 'failed to authenticate token.' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);

        res.status(401).json({ message: 'Failed to authenticate token.' });
    }
};
module.exports = validateUser;
