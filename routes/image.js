import express from 'express';
import Image from '../models/images.js';

const router = express.Router();

router.get('/:id', (req, res) => {
    Image.findById(req.params.id, function (err, image) {
        if (err) console.log(err)
        res.render('singleImage', { title: 'Single Image', image: image })
    })
})

router.put('/:id', (req, res) => {
    Image.findOneAndUpdate({ _id: req.params.id }, {
        name: req.body.name
    }, { new: true }, function (err, image) {
        if (err) console.log(err)
        res.redirect('/')
    })
})

router.delete('/:id', (req, res) => {
    Image.deleteOne({ _id: req.params.id }, function (err) {
        if (err) console.log(err)
        res.redirect('/index')
    })
})

export default router;