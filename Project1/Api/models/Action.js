const { Schema, model } = require('mongoose');

const actionSchema = new Schema({
    action: String,
    date: Date
});

module.exports = model('Action', actionSchema);