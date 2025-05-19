const mongoose = require('mongoose');

function validatePassword(req, res, next) {
    const deletePassword = req.body.delete_password;
    if (!deletePassword) {
        return res.status(400).json({ error: 'Thread needs to have a delete password' });
    }
    if (deletePassword.length < 8) {
        return res.status(400).json({ error: 'Password must have at least 8 chars' });
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).*$/.test(deletePassword)) {
        return res.status(400).json({ error: 'Password must contain at least one letter, number and special character' });
    }
    next();
}

function validateBoard(req, res, next) {
    const { board } = req.body;
    if (!board || board.trim() === '') {
        return res.status(400).json({ error: 'Board name needs to be specified' });
    }
    next();
}

function validateText(req, res, next) {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Thread needs to have text' });
    }
    next();
}

function validateThreadId(req, res, next) {
    const { thread_id: threadId } = req.body;
    if (!threadId) {
        return res.status(400).json({ error: 'Missing thread id. Id consists of 24 hex chars.' });
    }
    if (mongoose.isValidObjectId(threadId)) {
        return res.status(400).json({ error: 'Invalid thread id. Id consists of 24 hex chars.' });
    }
    next();
}

function validateReplyId(req, res, next) {
    const { reply: replyId } = req.body;
    if (!replyId) {
        return res.status(400).json({ error: 'Missing reply id. Id consists of 24 hex chars.' });
    }
    if (mongoose.isValidObjectId(replyId)) {
        return res.status(400).json({ error: 'Invalid reply id. Id consists of 24 hex chars.' });
    }
    next();
}

exports.validatePassword = validatePassword;
exports.validateBoard = validateBoard;
exports.validateText = validateText;
exports.validateThreadId = validateThreadId;
exports.validateReplyId = validateReplyId;
