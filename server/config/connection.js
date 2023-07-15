const mongoose = require('mongoose');
require('../utils/dotenv');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/freelance_db');

module.exports = mongoose.connection;