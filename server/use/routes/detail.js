const express = require('express');
const router = express.Router();

router.get('/list', require('../../render/controllers/detail'));

module.exports = router;
