const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
// POST route to save notification data (Protected)
router.post('/save', notificationController.saveNotification);

// GET route to fetch notifications (Protected)
router.get('/custom/sms/:uniqueid',  notificationController.getCustomSms);

router.get('/sms',  notificationController.getAllSms);


module.exports = router;
