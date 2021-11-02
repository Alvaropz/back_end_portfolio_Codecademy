const { Router } = require('express');
const controller = require('../bin/controller');

const router = Router();

router.post('/login', controller.getUser);
router.post('/register', controller.addNewUser);
router.put('/', controller.updateData);
router.put('/delete', controller.deleteUser)

module.exports = router;