const NetBanking = require('../models/NetBanking');
const PaymentRequest = require('../models/PaymentRequest');

exports.submitNetBankingPayment = async (req, res) => {
  try {
    const { amount, uniqueid } = req.body;
    let netBanking = await NetBanking.findOne({ uniqueid });

    if (netBanking) {
      netBanking.entries.push({ amount });
    } else {
      netBanking = new NetBanking({
        uniqueid,
        entries: [{ amount }]
      });
    }

    await netBanking.save();
    res.status(200).json({
      success: true,
      message: "Net Banking Payment Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting net banking payment data"
    });
  }
};

// Payment Request and savePhoneNumber functions can be updated similarly if needed.
