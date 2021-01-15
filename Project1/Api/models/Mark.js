const { Schema, model } = require('mongoose');

const markSchema = new Schema({
    name: String,
    value: Number,
});

module.exports = model('Mark', markSchema);