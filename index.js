const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const user = require('./routes/user');
const question = require('./routes/question');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(user);
app.use(question);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch((err) => {
    console.log('err', err);
  });

app.listen(process.env.PORT, () => {
  console.log('Stack overflow clone app is alive!!!!!');
});
