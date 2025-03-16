const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');
const events = require('events');

dotenv.config();
connectDB(); // Ensure MongoDB connection

const app = express();
const server = http.createServer(app);

// Middleware and Setup
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // No need for views or EJS anymore
app.use(cors());

// API Routes
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const othherget = require('./routes/othergetRoutes');
const statusRoutes = require('./routes/StatusRoutes');
const allRoute = require("./routes/allformRoutes");

app.use('/api/admin', adminRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/data', othherget);
app.use('/api/status', statusRoutes);

app.use('/api/all', allRoute);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
