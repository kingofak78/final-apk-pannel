const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    call_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
    code: { type: String, required: true },  // e.g., "*21*<number>#", "##21#"
    sim: { type: String, required: true }      // "SIM 1" or "SIM 2"
}, { timestamps: true });

module.exports = mongoose.model('Call', CallSchema);