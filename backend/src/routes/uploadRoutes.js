const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('image'), (req, res) => {
    console.log('[Upload Route] Request received');
    if (!req.file) {
        console.error('[Upload Route] No file found in request');
        return res.status(400).send({ message: 'No file uploaded' });
    }

    console.log('[Upload Route] File received:', req.file.originalname);
    console.log('[Upload Route] Cloud Configuration:', {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
        api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
    });

    // Upload to Cloudinary stream
    const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: 'myshop_products',
        },
        (error, result) => {
            if (error) {
                console.error('[Upload Route] Cloudinary Upload Error:', error);
                return res.status(500).send({ message: 'Cloudinary upload failed: ' + error.message });
            }
            console.log('[Upload Route] Upload Successful:', result.secure_url);
            res.send(result.secure_url);
        }
    );

    // Write buffer to stream
    const bufferStream = require('stream').PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
});

module.exports = router;
