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
router.delete('/delete/:id', controller.delete);

module.exports = router;