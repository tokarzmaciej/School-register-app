const express = require('express');
const router = express.Router();
const Mark = require('../models/Mark');
const Subject = require('../models/Subject');


router.post('/createMark', async (req, res) => {
    try {
        const newMark = await Mark.create({ ...req.body })

        res.send({ newMark: newMark })

    } catch (error) {
        res.send("error" + error);
    }
});

router.post('/:idStudent/subjects/:idSubject/:idMark', async (req, res) => {
    try {
        const idStudent = req.params.idStudent
        const idSubject = req.params.idSubject
        const idMark = req.params.idMark

        // const newMark = await Mark.create({ ...req.body })

        const addMarkToSubject = await Subject.findByIdAndUpdate(idSubject,
            { '$push': { 'marks': idMark } },
            { 'new': true })

        res.send({ newMark: "Add mark" })

    } catch (error) {
        res.send("error" + error);

    }
});

router.delete('/subjects/:idSubject/:idMark', async (req, res) => {
    try {
        const idSubject = req.params.idSubject
        const idMark = req.params.idMark

        const deleteMarkWithSubject = await Subject.findByIdAndUpdate(idSubject,
            { '$pull': { 'marks': idMark } },
            { 'new': true })

        res.send({ deleteMark: deleteMark })

    } catch (error) {
        res.send("error" + error);

    }
});

// router.patch('/marks/:idMark', async (req, res) => {
//     try {
//         const idMark = req.params.idMark;
//         const data = req.body

//         const updateSubject = await Mark.findByIdAndUpdate(idMark, data, { new: true })

//         res.send({ updateSubject: updateSubject })

//     } catch (error) {
//         res.send("error" + error);
//     }
// });


module.exports = router;
