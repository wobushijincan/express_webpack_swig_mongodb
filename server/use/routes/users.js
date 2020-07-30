const express = require('express');
const router = express.Router();

router.get('/list', require('../../render/controllers/users'));
router.get('/info', require('../../render/controllers/users/info'));

module.exports = router;
