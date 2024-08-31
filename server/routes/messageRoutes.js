const express = require('express');
const { submitMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/submit-message', submitMessage);

module.exports = router;
