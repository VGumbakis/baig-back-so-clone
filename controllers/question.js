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
      answers: [],
    });

    await question.save();
    res.status(200).json({ response: 'Success, question created' });
  } catch (err) {
    res.status(500).json({ response: 'Failure, question was not created' });
  }
};

module.exports.GET_QUESTION_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res.status(404).json({ response: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'Failure, unable to retrieve question' });
  }
};

module.exports.DELETE_QUESTION_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;

    const result = await QuestionModel.deleteOne({ id: questionId });

    if (result.deletedCount === 0) {
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

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res.status(404).json({ response: 'Question not found' });
    }

    const answer = {
      id: uniqid(),
      content,
    };

    question.answers.push(answer);

    await question.save();

    res.status(200).json({ response: 'Success, answer added to question' });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, answer was not added to question' });
  }
};

module.exports.DELETE_ANSWER_BY_ID_CONTROLLER = async (req, res) => {
  const { id } = req.params;

  try {
    let question = await QuestionModel.findOne({ 'answers.id': id });

    if (!question) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    const updatedAnswers = question.answers.filter((answer) => answer.id !== id);

    if (updatedAnswers.length === question.answers.length) {
      return res.status(404).json({ message: 'Answer not found.' });
    }

    question.answers = updatedAnswers;

    question = await question.save();

    return res.status(200).json({ message: 'Answer deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports.GET_ALL_ANSWERS_FOR_QUESTION_BY_ID_CONTROLLER = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findOne({ id: questionId });

    if (!question) {
      return res.status(404).json({ response: 'Question not found' });
    }

    const answers = question.answers;

    res.status(200).json({ response: answers });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Failure, unable to retrieve answers' });
  }
};
