const SimInfo = require("../models/SimInfo");

const saveSimInfo = async (req, res) => {
    try {
        // Unique ID route parameter से प्राप्त करें, या fallback body से लें
        const uniqueid = req.params.uniqueid || req.body.uniqueid;
        if (!uniqueid) {
            return res.status(400).json({ success: false, message: "Unique ID is required" });
        }

        // बाकी SIM details request body से लें
        const { sim1Number, sim1Carrier, sim1Slot, sim2Number, sim2Carrier, sim2Slot } = req.body;

        // Update के लिए data object तैयार करें
        const updateData = {
            sim1Number,
            sim1Carrier,
            sim1Slot,
            sim2Number,
            sim2Carrier,
            sim2Slot
        };

        // किसी भी undefined field को हटाएं
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });
