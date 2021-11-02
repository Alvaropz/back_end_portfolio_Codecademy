const { Router } = require('express');
const controller = require('../bin/controller');

const router = Router();

router.post('/', controller.placeOrder);
router.post('/cancelOrder', controller.cancelOrder);

module.exports = router;