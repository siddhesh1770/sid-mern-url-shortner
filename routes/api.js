const express = require('express');
const router = express.Router();
const {
    generateUrl,
    getUrl,
    getAllUrlByEmail,
} = require('../controllers/api');


router.post('/generateUrl', generateUrl);
router.post('/getUrl', getUrl);
router.post('/getAllUrlByEmail', getAllUrlByEmail);

module.exports = router;