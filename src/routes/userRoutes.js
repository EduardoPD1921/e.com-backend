const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authService = require('../services/authService');

router.post('/store', controller.store);
router.get('/show', controller.show);
router.post('/login', controller.login);
router.put('/likeProduct', authService.authorize, controller.likeProduct);
router.put('/unlikeProduct', authService.authorize, controller.unlikeProduct);
router.get('/getLikedProducts', authService.authorize, controller.getLikedProducts);
router.put('/addProductToCart', authService.authorize, controller.addProductToCart);
router.put('/removeProductFromCart', authService.authorize, controller.removeProductFromCart);
router.get('/getProductCart', authService.authorize, controller.getProductCart);
router.put('/addProductQuantity', authService.authorize, controller.addProductQuantity);
router.put('/removeProductQuantity', authService.authorize, controller.removeProductQuantity);
router.delete('/delete/:id', controller.delete);

module.exports = router;