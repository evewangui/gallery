import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Image from '../models/images.js';

// Ensure upload directory exists
const uploadDir = './public/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
}).single('image');

const router = express.Router();

router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.redirect('/?msg=' + encodeURIComponent(err.message));
        }

        if (!req.file) {
            return res.redirect('/?msg=Please select an image to upload');
        }

        try {
            const newImage = new Image({
                name: req.file.originalname,
                size: req.file.size,
                path: 'images/' + req.file.filename
            });

            await newImage.save();
            console.log('Saved image:', newImage);
            res.redirect('/?msg=Image uploaded successfully');
        } catch (err) {
            console.error('Database error:', err);
            res.redirect('/?msg=Error saving to database');
        }
    });
});

export default router;