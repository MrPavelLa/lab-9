const mongoose = require('mongoose');
const validator = require('validator');

const applicationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  loanName: {
    type: String, 
    required: true
  },
  loanTerm: {
    type: Number, 
    required: true
  },
  amount: {
    type: Number, 
    required: true
  },
  date: {
    type: String, 
    required: true
  },
  time: {
    type: String, 
    required: true
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

