const QuestionModel = require('../models/user');
const uniqid = require('uniqid');
module.exports.GET_ALL_QUESTIONS_CONTROLLER = async (req, res) => {
  try {
    const users = await QuestionModel.find().sort({ title: 1 });

    res.status(200).json({ response: questions });
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
