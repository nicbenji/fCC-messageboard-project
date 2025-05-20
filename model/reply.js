const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    delete_password: {
        type: String,
        required: true
    },
    reported: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: false,
    }
});

module.exports = replySchema;
