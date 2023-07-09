const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization');

const { GET_ALL_QUESTIONS_CONTROLLER, POST_QUESTION_CONTROLLER, GET_QUESTION_BY_ID_CONTROLLER, DELETE_QUESTION_BY_ID_CONTROLLER, POST_ANSWER_FOR_QUESTION_CONTROLLER, DELETE_ANSWER_BY_ID_CONTROLLER, GET_ALL_ANSWERS_FOR_QUESTION_BY_ID_CONTROLLER } = require('../controllers/question');

router.get('/questions', GET_ALL_QUESTIONS_CONTROLLER);
router.post('/question', authorizationMiddleware, POST_QUESTION_CONTROLLER);
router.get('/question/:id', GET_QUESTION_BY_ID_CONTROLLER);
router.delete('/question/:id', authorizationMiddleware, DELETE_QUESTION_BY_ID_CONTROLLER);
router.post('/question/:id/answer', authorizationMiddleware, POST_ANSWER_FOR_QUESTION_CONTROLLER);
router.delete('/answer/:id', authorizationMiddleware, DELETE_ANSWER_BY_ID_CONTROLLER);
router.get('/question/:id/answers', GET_ALL_ANSWERS_FOR_QUESTION_BY_ID_CONTROLLER);

module.exports = router;
