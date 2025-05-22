const mongoose = require('mongoose');

function validatePassword(req, res, next) {
    const deletePassword = req.body.delete_password;
    if (!deletePassword) {
        return res.status(400).json({ error: 'Thread needs to have a delete password' });
    }
    // if (deletePassword.length < 8) {
    //     return res.status(400).json({ error: 'Password must have at least 8 chars' });
    // }
    // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).*$/.test(deletePassword)) {
    //     return res.status(400).json({ error: 'Password must contain at least one letter, number and special character' });
    // }
    next();
}

function validateText(req, res, next) {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Thread needs to have text' });
    }
    next();
}

function validateId({ in: location = 'body', fieldName }) {
    return (req, res, next) => {
        const paramSource = req[location] || {};
        const id = paramSource[fieldName];

        if (!id) {
            return res.status(400).json({ error: `Missing ${fieldName}. Id consists of 24 hex chars.` });
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: `Invalid ${fieldName}. Id consists of 24 hex chars.` });
        }
        next();
    }
}


exports.validatePassword = validatePassword;
exports.validateText = validateText;
exports.validateId = validateId;
