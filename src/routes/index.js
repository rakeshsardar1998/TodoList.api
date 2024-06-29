const express = require('express');
const router = express.Router();
const todoListRoutes = require('./todoListRoutes');

router.use('/todos', todoListRoutes);
module.exports = router;