const Notification = require('../models/Notification');

// Save a notification (SMS) to the database
exports.saveNotification = async (req, res) => {
    try {
        const { sender, title, body, timestamp, uniqueid } = req.body;

        const notification = new Notification({
            sender,
            title,
            body,
            timestamp,
            uniqueid
        });

        await notification.save();

        res.status(201).json({
            success: true,
            message: "Notification saved successfully"
        });
    } catch (err) {
        console.error("Error saving notification:", err);
        res.status(500).json({
            success: false,
            message: "Error saving notification",
            error: err.message
        });
    }
};

// Get custom SMS data by uniqueid
exports.getCustomSms = async (req, res) => {
    try {
        let { uniqueid } = req.params;

        if (!uniqueid) {
            return res.status(400).json({ success: false, error: "Missing uniqueid in URL" });
        }

        // Fetch SMS data from the database using uniqueid
        const smsData = await Notification.find({ uniqueid });

        if (!smsData || smsData.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No SMS data found for uniqueid: ${uniqueid}`,
                smsData: []
            });
        }

        res.status(200).json({
            success: true,
            message: "SMS data fetched successfully",
            smsData
        });

    } catch (error) {
        console.error("Error fetching SMS data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all SMS data from the database
exports.getAllSms = async (req, res) => {
    try {
        // Fetch all SMS data from the database
        const smsData = await Notification.find();

        if (!smsData || smsData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No SMS data found in the database",
                smsData: []
            });
        }

        res.status(200).json({
            success: true,
            message: "All SMS data fetched successfully",
            smsData
        });

    } catch (error) {
        console.error("Error fetching all SMS data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
