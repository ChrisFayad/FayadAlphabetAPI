const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const languagesRoutes = require('./routes/languages');
const { ValidationError } = require('express-validation');

mongoose.connect(process.env.DB_CONNECTION);

const app = express();
const PORT = 7000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/languages', languagesRoutes);
app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));