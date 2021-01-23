const express = require('express');
const router = express.Router();
const Mark = require('../models/Mark');
const Subject = require('../models/Subject');


router.post('/createMark', async (req, res) => {
    try {
        const idSubjects = req.body.idSubjects
        const mark = req.body.mark

        const newMark = await Mark.create(mark)

        const addMarkToSubject = await Subject.updateMany({ _id: { '$in': idSubjects } },
            { '$push': { 'marks': newMark["_id"] } },
            { 'new': true })

        res.send({ newMark: newMark })

    } catch (error) {
        res.send("error" + error);

    }
});

router.delete('/subjects/:idSubject/marks/:idMark', async (req, res) => {
    try {
        const idSubject = req.params.idSubject
        const idMark = req.params.idMark

        const deleteMarkWithSubject = await Subject.findByIdAndUpdate(idSubject,
            { '$pull': { 'marks': idMark } },
            { 'new': true })

        res.send({ deletedMark: deleteMarkWithSubject })

    } catch (error) {
        res.send("error" + error);

    }
});

router.patch('/marks/:idMark', async (req, res) => {
    try {
        const idMark = req.params.idMark;
        const data = req.body

        const updateMark = await Mark.findByIdAndUpdate(idMark, data, { new: true })

        res.send({ updatedMark: updateMark })

    } catch (error) {
        res.send("error" + error);
    }
});

module.exports = router;