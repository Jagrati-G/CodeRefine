const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// This stays the same regardless of the Gemini version
router.post("/get-review", aiController.getReview);

module.exports = router;