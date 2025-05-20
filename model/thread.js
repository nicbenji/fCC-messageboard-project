const mongoose = require('mongoose');
const { replySchema } = require('./reply');

const threadSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    reported: {
        type: Boolean,
        default: false
    },
    delete_password: {
        type: String,
        required: true
    },
    replies: {
        type: [replySchema],
        default: []
    }
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'bumped_on'
    }
});

const Thread = new mongoose.model('Thread', threadSchema);
module.exports = Thread;
