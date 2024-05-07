const argon = require('argon2');

const hash = async (password) => {
    return await argon.hash(password);
}

const verify = async (hashedPassword, plainPassword) => {
    try {
        return await argon.verify(hashedPassword, plainPassword);
    } catch (error) {
        if (error.message === 'pchstr must contain a $ as first char') {
            return false; // Return false indicating invalid hash format
        } else {
            throw error; // Re-throw other errors
        }
    }
}

module.exports = { hash, verify };
