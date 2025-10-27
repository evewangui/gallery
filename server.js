import dotenv from "dotenv";
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Optional: custom config file if you use one
const config = require('./_config');

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize Express
const app = express();

// Connect to MongoDB
const mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const dbName = process.env.DB_NAME || 'darkroom';

mongoose.connect(`${mongodb_url}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ Database connected successfully'));

// View Engine
app.set('view engine', 'ejs');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', index);
app.use('/image', image);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
