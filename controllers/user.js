const UserModel = require('../models/user');
const uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.SIGN_UP_CONTROLLER = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(404).json({ response: 'Validation was unsuccessful' });
    }

    if (!password || password.length < 6 || !/\d/.test(password)) {
      return res.status(404).json({ response: 'Validation was unsuccessful' });
    }

    const capitalizedFirstNameLetter = name.charAt(0).toUpperCase() + name.slice(1);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new UserModel({
          id: uniqid(),
          name: capitalizedFirstNameLetter,
          email: email,
          password: hash,
          written_answers: [],
          likes_get: 0,
        });
        await user.save();

        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2h',
          }
        );

        const refreshToken = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: '1d',
          }
        );

        res.status(200).json({ response: 'Sign Up success, user created', jwt: token, refreshToken: refreshToken });
      });
    });
  } catch (err) {
    res.status(500).json({ response: 'Sign Up was not successful, user was not created' });
  }
};

module.exports.LOGIN_CONTROLLER = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ response: 'Wrong login details' });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );

      const refreshToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: '1d',
        }
      );

      return res.status(200).json({ response: 'Login successful', jwt: token, refreshToken: refreshToken });
    } else {
      return res.status(404).json({ response: 'Wrong login details' });
    }
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ response: 'Something went wrong' });
  }
};
