const QuestionModel = require('../models/question');
const uniqid = require('uniqid');
module.exports.GET_ALL_QUESTIONS_CONTROLLER = async (req, res) => {
  try {
    const questions = await QuestionModel.find().sort({ title: 1 });

    const questionsWithAnswerStatus = questions.map((question) => {
      const answered = question.answers && question.answers.length > 0;
      return {
        id: question.id,
        title: question.title,
        content: question.content,
        answered,
      };
    });

    res.status(200).json({ response: questionsWithAnswerStatus });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Something went wrong' });
  }
};

module.exports.POST_QUESTION_CONTROLLER = async (req, res) => {
  try {
    const question = new QuestionModel({
      id: uniqid(),
      title: req.body.title,
      content: req.body.content,
    });

    await question.save();
    res.status(200).json({ response: 'Success, question created' });
  } catch (err) {
    res.status(500).json({ response: 'Failure, question was not created' });
  }
};

module.exports.DELETE_QUESTION_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;

    // Find the question by ID and delete it
    const result = await QuestionModel.deleteOne({ id: questionId });

    if (result.deletedCount === 0) {
      // No question was deleted
      return res.status(404).json({ response: 'Question not found' });
    }

    res.status(200).json({ response: 'Success, question deleted' });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, question was not deleted' });
  }
};

module.exports.POST_ANSWER_FOR_QUESTION_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { content } = req.body;

    // Find the question by ID
    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      // Question not found
      return res.status(404).json({ response: 'Question not found' });
    }

    // Initialize the answers array if it's undefined
    if (!question.answers) {
      question.answers = [];
    }

    // Create a new answer for the question
    const answer = {
      id: uniqid(),
      content,
    };

    // Add the answer to the question's answers array
    question.answers.push(answer);

    // Save the updated question
    await question.save();

    res.status(200).json({ response: 'Success, answer added to question' });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, answer was not added to question' });
  }
};

module.exports.DELETE_ANSWER_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const answerId = req.params.id;
    const questionId = req.query.questionId;

    // Find the question by ID
    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      // Question not found
      return res.status(404).json({ response: 'Question not found' });
    }

    // Find the index of the answer within the question's answers array
    const answerIndex = question.answers.findIndex((answer) => answer.id === answerId);

    if (answerIndex === -1) {
      // Answer not found
      return res.status(404).json({ response: 'Answer not found' });
    }

    // Remove the answer from the question's answers array
    question.answers.splice(answerIndex, 1);

    // Save the updated question
    await question.save();

    res.status(200).json({ response: 'Success, answer deleted' });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, answer was not deleted' });
  }
};

module.exports.GET_ALL_ANSWERS_FOR_QUESTION_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;

    // Find the question by ID
    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      // Question not found
      return res.status(404).json({ response: 'Question not found' });
    }

    // Retrieve all answers for the question
    const answers = question.answers;

    res.status(200).json({ response: answers });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, unable to retrieve answers' });
  }
};
