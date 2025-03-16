const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
  deviceId: {
    type: String, 
    required: true,
    unique: true        
  },
  address: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sim: {
    type: String,
    enum: ['SIM 1', 'SIM 2'],
    required: true
  },
  status: {
    type: String,
    default: 'Sent'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SMS', smsSchema);
