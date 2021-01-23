const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    gender: String,
    class: String,
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }]
});

module.exports = model('Student', studentSchema);