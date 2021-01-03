const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    name: String,
    idStudent: { type: Schema.Types.ObjectId, ref: 'Student' },
    marks: [{ type: Schema.Types.ObjectId, ref: "Mark" }],
});

module.exports = model('Subject', subjectSchema);