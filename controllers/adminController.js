const Admin = require('../models/Admin');

// Get Admin Phone Number
exports.getAdminNumber = async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        res.status(200).json({
            success: true,
            data: admin.phoneNumber
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching admin phone number",
            error: err.message
        });
    }
};

// Update Admin Phone Number
exports.updateAdminNumber = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (phoneNumber === 'null') {
            // If the phone number is 'null' (erase operation), set the phone number to null in the database
            await Admin.updateOne({}, { phoneNumber: null });
        } else {
            // Validate the phone number format (supports 10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneNumber)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid phone number format"
                });
            }

            // Check if the admin exists
            let admin = await Admin.findOne();
            if (!admin) {
                admin = new Admin({ phoneNumber });
            } else {
                admin.phoneNumber = phoneNumber;
            }

            // Save or update the admin phone number
            await admin.save();
        }

        // Return a JSON response after successful update
        res.status(200).json({
            success: true,
            message: "Admin phone number updated successfully",
            phoneNumber: phoneNumber
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error updating admin phone number",
            error: err.message
        });
    }
};
