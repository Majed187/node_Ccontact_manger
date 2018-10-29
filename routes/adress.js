const express = require('express');
const router = express.Router();
const Boom = require('boom');

const AdressService = require('../service/service-adress');
/* GET users listing. */

router.get('/', async (req, res) => {
    const adress = await AdressService.retrieve();
    return res.json(adress);

});

router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const adress = await AdressService.retrieve(id);
        return res.json(adress);
    } catch (e) {
        next(Boom.notFound(`No such team with id: ${id}`));
    }
});

router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const adress = await AdressService.update(id, req.body);
        res.json(adress);
    } catch (err) {
        if (err) {
            next(Boom.badRequest(err));
        } else {
            next(Boom.notFound(`No such team with id: ${id}`));
        }
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const adress = await AdressService.create(req.body);
    return res.json(adress);
});

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const adress = await AdressService.delete(id);
        res.json(adress);
    } catch (e) {
        next(Boom.notFound(`No such team with id: ${id}`));
    }
});

module.exports = router;