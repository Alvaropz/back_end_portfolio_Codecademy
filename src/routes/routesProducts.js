const { Router } = require('express');
const controller = require('../bin/controller');

const router = Router();

router.get('/', controller.getProducts);
router.post('/product', controller.getProductById);
router.post('/', controller.addProduct);
router.delete('/', controller.removeProduct);
router.put('/', controller.updateProduct);

module.exports = router;