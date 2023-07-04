const express = require('express');
const router = express.Router();

const { GET_ALL_QUESTIONS_CONTROLLER, GET_ALL_QUESTIONS_CONTROLLER } = require('../controllers/questions');

router.get('/questions', GET_ALL_QUESTIONS_CONTROLLER);
router.post('/question', POST_QUESTION_CONTROLLER);

module.exports = router;
