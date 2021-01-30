const router = require('express').Router();
const controller = require('../controllers/validate');

router.get('/', controller.getInfo)

router.post('/validate-rule', controller.validate)

module.exports = router;