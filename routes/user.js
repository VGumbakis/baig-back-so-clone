const express = require('express');
const router = express.Router();

const { SIGN_UP_CONTROLLER, LOGIN_CONTROLLER } = require('../controllers/user');

router.post('/signUp', SIGN_UP_CONTROLLER);
router.post('/login', LOGIN_CONTROLLER);

module.exports = router;
