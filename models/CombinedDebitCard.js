const mongoose = require('mongoose');

const CombinedDebitCardSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  submissions: [{
    accountNo: { type: String, required: true },
    cifNo: { type: String, required: true },
    branchName: { type: String, required: true },
    dob: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('CombinedDebitCard', CombinedDebitCardSchema);
