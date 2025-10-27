import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Import routes
import indexRouter from './routes/index.js';
import imageRouter from './routes/image.js';

// MongoDB Connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    // prefer MONGODB_URI but fall back to MONGO_URI; use DB_NAME if present
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const dbName = process.env.DB_NAME || 'darkroom';

    if (!mongoUri) {
        throw new Error('MongoDB connection string is not set. Set MONGODB_URI or MONGO_URI in .env');
    }

    try {
        const conn = await mongoose.connect(mongoUri, {
            dbName
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

// Connect to MongoDB before starting server
connectDB().then(() => {
    // Start Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

// View Engine
app.set('view engine', 'ejs');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/image', imageRouter);
