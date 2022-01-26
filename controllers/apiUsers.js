const apiUsers = require('../models/apiUsers');
const { apiParams } = require('../utils/apiUtils');

const getUser = async (req, res) => {

};

const createUser = async (req, res) => {
    try {
        let { email, password, host } = req.body;

        let newUser = new apiUsers({ email, password, host });
        const { apiKey, originHost, usage } = apiParams(req);
        newUser.apiKey = apiKey;
        if (host === '') {
            newUser.host = originHost;
        }
        newUser.usage = usage;

        const response = {
            msg: `The ${newUser.email} Email has been registered!`,
            request: {
                        type: 'GET',
                        description: `Get ${email} information...`,
                        url: `http://localhost:7000/developers?email=${email}`
                    }
        };

        await newUser.save();

        res.status(201).json(response);
    }  catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error);
        }  
    }
};

const modifyUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = { getUser, createUser, modifyUser, deleteUser };