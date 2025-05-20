const bcrypt = require('bcrypt');

async function hashPassword(password, saltRounds = 13) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error('Password hashing failed. Please try again.');
    }
}

async function comparePassword(plain, hash) {
    try {
        return await bcrypt.compare(plain, hash);
    } catch (error) {
        throw new Error('Password comparing failed. Please try again.');
    }
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
