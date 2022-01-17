const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const languagesRoutes = require('./routes/languages');

mongoose.connect(process.env.DB_CONNECTION);

const app = express();
const PORT = 7000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/languages', languagesRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));