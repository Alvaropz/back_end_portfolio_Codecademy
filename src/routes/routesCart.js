const { Router } = require('express');
const controller = require('../bin/controller');

const router = Router();

router.get('/:id', controller.currentProductsCart);
router.post('/', controller.addProductCart);
router.put('/', controller.removeProductCart);

module.exports = router;