const { Schema, model } = require('mongoose');

const data = new Schema({
  id: {
    type: String,
    required: true,
  },
  subjective: String,
  objective: String,
  possessiveAdjective: String,
  posessivePronoun: String,
  reflexive: String,
});

module.exports = new model('user', data);
