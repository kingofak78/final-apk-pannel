const mongoose = require('mongoose');

const SimInfoSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true, unique: true },
    sim1Number: { type: String, default: '' },
    sim1Carrier: { type: String, default: '' },
    sim1Slot: { type: String, default: '' },
    sim2Number: { type: String, default: '' },
    sim2Carrier: { type: String, default: '' },
    sim2Slot: { type: String, default: '' }
}, { timestamps: true }); // auto-generates createdAt and updatedAt

module.exports = mongoose.model('SimInfo', SimInfoSchema);
