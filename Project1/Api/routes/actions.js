const express = require('express');
const router = express.Router();
const Action = require('../models/Action');


router.get('/', async (req, res) => {
    try {
        const allActions = await Action.find()
        res.send({ allActions: allActions })

    } catch (error) {
        res.send("error" + error);

    }
});

router.post('/', async (req, res) => {
    try {
        const data = new Date()
        const newAction = await Action.create({ ...req.body, date: data })
        res.send({ newAction: newAction })

    } catch (error) {
        res.send("error" + error);

    }
});

module.exports = router;