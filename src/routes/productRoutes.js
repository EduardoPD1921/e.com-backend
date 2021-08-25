const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const upload = multer();

router.post('/store', upload.single('image'), controller.store);

module.exports = router;