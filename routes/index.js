import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';
import url from 'url';
import Image from '../models/images.js';

const router = express.Router();

router.get('/', (req, res) => {

    Image.find({}, function (err, images) {
        // console.log(images)
        if (err) console.log(err);
        res.render('index', { images: images, msg: req.query.msg })
    })
})

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);
            // res.send("test");
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selcted!');
            } else {
                // const imageObj = {
                //     id: uuid.v4(),
                //     name: req.file.filename,
                //     path: 'images/' + req.file.filename
                // }
                // db.push(imageObj);
                // console.log(db);

                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                })

                // save the uploaded image to the database
                newImage.save()


                res.redirect('/?msg=File uploaded successfully');
            }
        }
    })
})

export default router;