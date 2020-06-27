const express = require('express')
const router = express.Router()

// import from controllers

const {register} = require('../controllers/auth');

router.get('/register', register)

module.exports = router;