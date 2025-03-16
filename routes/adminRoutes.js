const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/number',adminController.getAdminNumber); // Protect get number route


module.exports = router;
