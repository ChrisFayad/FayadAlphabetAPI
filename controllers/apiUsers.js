const apiUsers = require('../models/apiUsers');
const { apiParams } = require('../utils/apiUtils');

const getUser = async (req, res) => {
    const email = req.query.email;
    try {
        const user = await apiUsers.findOne({ email: email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ msg: `The user with the email ${email} is not found!`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const createUser = async (req, res) => {
    try {
        let { email, password, host } = req.body;

        let newUser = new apiUsers({ email, password, host });
        const { apiKey, usage } = apiParams(req);
        newUser.apiKey = apiKey;
        newUser.usage = usage;
        if (host === undefined) {
            newUser.host = req.header('Host');
        }

        const response = {
            msg: `The ${newUser.email} Email has been registered!`,
            request: {
                        type: 'GET',
                        description: `Get ${email} information...`,
                        url: `https://localhost:7000/developers?email=${email}`
                    }
        };

        await newUser.save();

        res.status(201).json(response);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error.message);
        }  
    }
};

const modifyUser = async (req, res) => {
    const { email, password, host } = req.body;
    try {
        await apiUsers.updateOne({ email: email },
            {$set: { password: password,
                     host: host }});
        res.status(200).json(`The email ${email} has been updated!`);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ msg: error.message.split(':')[2] });
        } else {
            res.status(500).json(error.message);
        }  
    }
};

const deleteUser = async (req, res) => {
    const email = req.query.email;
    try {
        const user = await apiUsers.deleteOne({ email: email });
        if (user) {
            res.status(200).json(`The user with the email ${email} has been deleted!`);
        } else {
            res.status(404).json({ msg: `The user with the email ${email} is not found!`});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = { getUser, createUser, modifyUser, deleteUser };