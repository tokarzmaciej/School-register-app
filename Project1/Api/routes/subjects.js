const express = require('express');
const router = express.Router({ mergeParams: true });

const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Mark = require('../models/Mark');



router.post('/', async (req, res) => {
  try {
    const id = req.params.idStudent

    const newSubject = await Subject.create({ ...req.body, isStudent: id })

    const addSubjectForStudent = await Student.findByIdAndUpdate(id,
      { '$push': { 'subjects': newSubject._id } },
      { 'new': true })
    res.send({ newSubjects: newSubject })

  } catch (error) {
    res.send("error" + error);

  }
});

router.delete('/:idSubject', async (req, res) => {
  try {
    const idSubject = req.params.idSubject;
    const idStudent = req.params.idStudent;

    // usuwanie przedmiotu
    const deleteSubject = await Subject.findByIdAndDelete(idSubject)

    // usuwanie ocen z przedmiotu
    // const idMarks = await deleteSubject.marks
    // const deleteMarks = await Mark.deleteMany({ _id: { '$in': idMarks } })

    // usuwanie przedmiotu u studenta
    const deleteSubjectForStudent = await Student.findByIdAndUpdate(idStudent,
      { '$pull': { 'subjects': idSubject } },
      { 'new': true })

    res.send({ deleteSubject: deleteSubject })

  } catch (error) {
    res.send("error" + error);

  }
});

router.patch('/:idSubject', async (req, res) => {
  try {
    const idSubject = req.params.idSubject;
    const data = req.body

    const updateSubject = await Subject.findByIdAndUpdate(idSubject, data, { new: true })

    res.send({ updateSubject: updateSubject })

  } catch (error) {
    res.send("error" + error);
  }
});




module.exports = router;
