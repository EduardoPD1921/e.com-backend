const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authService = require('../services/authService');
const multer = require('multer');
const upload = multer();

router.post('/store', upload.single('image'), controller.store);
router.get('/show', controller.show);
router.get('/getById/:id', controller.getProductById);
router.get('/getLastAdded', controller.getLastAdded);
router.put('/addComment', authService.authorize, controller.addComment);

module.exports = router;