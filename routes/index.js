import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';
import url from 'url';
import Image from '../models/images.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const images = await Image.find({});
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                try {
                    // create new image
                    let newImage = new Image({
                        name: req.file.filename,
                        size: req.file.size,
                        path: 'images/' + req.file.filename
                    });

                    // save the uploaded image to the database
                    await newImage.save();
                    res.redirect('/?msg=File uploaded successfully');
                } catch (err) {
                    console.error(err);
                    res.redirect('/?msg=Error saving to database');
                }
            }
        }
    });
});

export default router;