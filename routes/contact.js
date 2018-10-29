const express = require('express');
const router = express.Router();
const Boom = require('boom');
const decodeToken = require('../middelware/decodedToken');
const validateUser = require('../middelware/validate-user');

const ContactService = require('../service/service-contact');
/* GET users listing. */
router.use(decodeToken, validateUser);

router.get('/', async (req, res) => {
    const contact = await ContactService.retrieve(req.user.id);
    return res.send(contact);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await ContactService.retrieve(null, id);
        return res.send(contact);
    } catch (e) {
        next(Boom.notFound(`No such team with id: ${id}`));
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await ContactService.update(id, req.body);
        res.json(contact);
    } catch (err) {
        if (err) {
            next(Boom.badRequest(err));
        } else {
            next(Boom.notFound(`No such team with id: ${id}`));
        }
    }
});

router.post('/', async (req, res) => {
    const contact = req.body;
    console.log(req.body);
    contact.user = req.user._id;
    const data = await ContactService.create(contact);
    return res.json(data);
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await ContactService.delete(id);
        res.json(contact);
    } catch (e) {
        next(Boom.notFound(`No such team with id: ${id}`));
    }
});

module.exports = router;
