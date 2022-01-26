const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const languagesRoutes = require('./routes/languages');
const apiUsersRoutes = require('./routes/apiUsers');

const app = express();
const PORT = 7000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/languages', cors(), languagesRoutes);
app.use('/developers', cors({origin: 'https://localhost:7000'}), apiUsersRoutes);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

https.createServer(options, app).listen(PORT, () => console.log(`Server is running on port ${PORT}`));