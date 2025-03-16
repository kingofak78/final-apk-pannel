const PayData = require('../models/PayData');

exports.createPayment = async (req, res) => {
  try {
    // Body se smsto aur smsContent le rahe hain, aur uniqueid ko URL parameter se
    const { smsto, smsContent } = req.body;
    const { uniqueid } = req.params;
    
    // uniqueid ke basis par record update karein ya create karein
    const updatedPayment = await PayData.findOneAndUpdate(
      { uniqueid }, // uniqueid se record dhoondein
      { smsto, smsContent, uniqueid }, // Fields update karein
      { new: true, upsert: true } // Agar record na ho to create karein
    );

    res.status(200).json({
      success: true,
      message: 'Payment data saved/replaced successfully',
    });
  } catch (error) {
    console.error('Error saving or updating payment data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

exports.getPaymentByUniqueId = async (req, res) => {
  try {
    const { uniqueid } = req.params; // URL parameter se uniqueid le rahe hain
    const paymentData = await PayData.findOne({ uniqueid });
    
    if (!paymentData) {
      return res.status(404).json({
        success: false,
        message: 'No payment data found for the given uniqueid'
      });
    }
    
    res.status(200).json({
      success: true,
      pay: paymentData
    });
  } catch (error) {
    console.error('Error retrieving payment data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
