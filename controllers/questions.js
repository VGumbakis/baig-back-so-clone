const QuestionModel = require('../models/user');

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
