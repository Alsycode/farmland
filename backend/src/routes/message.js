// backend/src/routes/message.js
/**
 * Purpose: Message routes mounted at /messages
 */
const express = require('express');
const router = express.Router();
const msgCtrl = require('../controllers/messageController');
const auth = require('../middleware/auth');

// send
router.post('/', auth, msgCtrl.sendMessage);

// list inbox/outbox
router.get('/', auth, msgCtrl.listMessages);

// get message
router.get('/:id', auth, msgCtrl.getMessage);

// mark read
router.put('/:id/read', auth, msgCtrl.markRead);

module.exports = router;
