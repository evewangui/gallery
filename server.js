import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory name (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize dotenv
dotenv.config();

// Import routes (need to add .js extension for ES modules)
import index from './routes/index.js';
import image from './routes/image.js';

// Import config
import config from './_config.js';

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
