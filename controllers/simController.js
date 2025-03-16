const SimInfo = require("../models/SimInfo");

const saveSimInfo = async (req, res) => {
    try {
        const { uniqueid, sim1Number, sim1Carrier, sim1Slot, sim2Number, sim2Carrier, sim2Slot } = req.body;

        if (!uniqueid) {
            return res.status(400).json({ success: false, message: "Unique ID is required" });
        }

        // Update ke liye data object banayein aur ek extra field updatedAt add karein
        const updateData = {
            sim1Number,
            sim1Carrier,
            sim1Slot,
            sim2Number,
            sim2Carrier,
            sim2Slot,
            updatedAt: new Date() // Har update me current timestamp set hoga
        };

        // Agar koi field undefined ho to use remove kar dein.
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // FindOneAndUpdate use karke document update karo ya agar nahi milta to naya insert karo (upsert: true)
        const simData = await SimInfo.findOneAndUpdate(
            { uniqueid },
            { $set: updateData },
            { new: true, upsert: true }
        );

        return res.status(200).json({ success: true, message: "Updated successfully", data: simData });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

module.exports = { saveSimInfo };
