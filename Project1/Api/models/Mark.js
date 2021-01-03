const { Schema, model } = require('mongoose');

const markSchema = new Schema({
    value: Number,
    idStudent: { type: Schema.Types.ObjectId, ref: 'Student' },
    idSubject: { type: Schema.Types.ObjectId, ref: 'Subject' }
});

module.exports = model('Mark', markSchema);