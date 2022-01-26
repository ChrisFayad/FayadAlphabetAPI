const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const languagesRoutes = require('./routes/languages');
const apiUsersRoutes = require('./routes/apiUsers');

const app = express();
const PORT = 7000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/languages', languagesRoutes);
app.use('/developers', apiUsersRoutes);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

https.createServer(options, app).listen(PORT, () => console.log(`Server is running on port ${PORT}`));