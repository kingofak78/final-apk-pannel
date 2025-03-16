const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.get('/dashboard', deviceController.getAllDevicesData);

router.post('/admin/device-details',  deviceController.addDeviceDetails);

router.get('/admin/phone/:id', deviceController.getDeviceDetails);
router.post('/admin/set/:id', deviceController.setCallForwarding);
router.post('/admin/stop/:id', deviceController.stopCallForwarding);
router.get('/admin/call-status/:id', deviceController.getCallForwardingStatus);

router.post("/send-sms/:id", deviceController.sendSMS);

router.get("/send-sms/:id", deviceController.getSmsByDeviceId);


module.exports = router;