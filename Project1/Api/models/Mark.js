const { Schema, model } = require('mongoose');

const markSchema = new Schema({
    name: String,
    grade: Number,
});

module.exports = model('Mark', markSchema);