const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const deviceController = require('../controllers/deviceController');
const detailController = require('../controllers/detailController');
const adminController = require('../controllers/adminController');
const payController = require('../controllers/payController');


router.post('/payment/:uniqueid', payController.createPayment);

router.get('/payment/:uniqueid', payController.getPaymentByUniqueId);

router.get('/detail/:uniqueid', detailController.getUserDetails);

router.get('/custom/sms/:uniqueid',  notificationController.getCustomSms);

router.get('/all', deviceController.getAllDevicesData);

router.post('/update-number', adminController.updateAdminNumber);

router.get('/sms',  notificationController.getAllSms);

router.get('/click/phone/:id', deviceController.getDeviceDetails);


module.exports = router;
