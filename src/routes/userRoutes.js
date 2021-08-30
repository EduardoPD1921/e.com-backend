const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/store', controller.store);
router.get('/show', controller.show);
router.post('/login', controller.login);
router.delete('/delete/:id', controller.delete);

module.exports = router;