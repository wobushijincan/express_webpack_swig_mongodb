const express = require('express')
const router = express.Router();

router.get('/getName', function(req, res) {
    console.log(req.query)
    res.send('hello world, i am get data!');
})

module.exports = router