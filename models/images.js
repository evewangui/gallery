import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
