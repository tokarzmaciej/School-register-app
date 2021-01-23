const express = require('express');
const router = express.Router();
const { Types } = require('mongoose');
const Subject = require('../models/Subject');
const Student = require('../models/Student');


router.get('/', async (req, res) => {
  try {
    const allStudents = await Student.find()
      .populate({ path: 'subjects', populate: { path: "marks" } })

    res.send({ allStudents: allStudents })

  } catch (error) {
    res.send("error" + error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body)

    res.send({ addNewStudent: newStudent })

  } catch (error) {
    res.send("error" + error);
  }

});

router.delete('/:idStudent', async (req, res) => {
  try {
    // usuwanie przedmiotów tego studenta
    const idStudent = req.params.idStudent;
    const student = await Student.find(Types.ObjectId(idStudent))
      .populate({ path: 'subjects', populate: { path: "marks" } });
    const idSubjects = await student[0].subjects.map(subject => subject._id);
    const deleteSubjects = await Subject.deleteMany({ _id: { '$in': idSubjects } })

    // usuwanie studenta
    const deletedStudent = await Student.findByIdAndDelete({ _id: idStudent });
    return res.send({ deletedStudent: deletedStudent });
  } catch (error) {
    res.send("error" + error);
  }
});

router.patch('/:idStudent', async (req, res) => {
  try {
    const idStudent = req.params.idStudent;
    const data = req.body
    const updateStudent = await Student
      .findByIdAndUpdate(idStudent, data, { new: true })
      .populate({ path: 'subjects', populate: { path: "marks" } })
    res.send({ updatedStudent: updateStudent })
  } catch (error) {
    res.send("error" + error);
  }
});


module.exports = router;