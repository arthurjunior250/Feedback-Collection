require('dotenv').config();
const jwt = require('jsonwebtoken');

const private_key = process.env.PRIVATE_KEY;

const signToken = (payload) => {
   return jwt.sign(payload, private_key);
}

const decodeToken = (token) => {
    return jwt.decode(token, private_key);
}

module.exports = { signToken, decodeToken };
