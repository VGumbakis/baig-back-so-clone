const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization');

const { GET_ALL_QUESTIONS_CONTROLLER, POST_QUESTION_CONTROLLER, DELETE_QUESTION_BY_ID_CONTROLLER } = require('../controllers/question');

router.get('/questions', GET_ALL_QUESTIONS_CONTROLLER);
router.post('/question', authorizationMiddleware, POST_QUESTION_CONTROLLER);
router.delete('/question/:id', authorizationMiddleware, DELETE_QUESTION_BY_ID_CONTROLLER);

module.exports = router;
