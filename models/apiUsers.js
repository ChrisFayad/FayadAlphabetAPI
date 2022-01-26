const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDB = mongoose.createConnection(process.env.USER_DB_CONNECTION);

const apiUsersSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        index: true
    },
    host: {
        type: String,
    },
    usage: [{
        date: String,
        count: Number
    }]
    // appID: {

    // }
});

apiUsersSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

apiUsersSchema.path('email').validate(async (email) => {
    const emailCount = await userDB.models.apiUsers.countDocuments({ email });
    return !emailCount;
}, `The email you are trying to register with already exists!`);

module.exports = userDB.model('apiUsers', apiUsersSchema);