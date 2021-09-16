const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const upload = multer();

router.post('/store', upload.single('image'), controller.store);
router.get('/show', controller.show);
router.get('/getById/:id', controller.getProductById);
router.get('/getLastAdded', controller.getLastAdded);

module.exports = router;