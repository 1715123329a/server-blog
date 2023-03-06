const express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
    res.send('ok')
});

module.exports = router;
