const mongoose = require('mongoose');

const Thread = require("../model/thread");
const { hashPassword, comparePassword } = require("./hashPassword");

async function createReply(board, text, deletePassword, threadId) {
    const passwordHash = await hashPassword(deletePassword);

    const thread = await Thread.findById({ _id: threadId, boardName: board });
    if (!thread) {
        throw new Error(`No thread with ${threadId} found in board ${board}`);
    }

    thread.replies.push({
        text,
        delete_password: passwordHash,
    });

    await thread.save();
    return {
        _id: thread._id,
        text: thread.text,
        replies: thread.replies.map((reply) => ({
            _id: reply._id,
            text: reply.text,
            created_on: reply.created_on
        })),
        bumped_on: thread.bumped_on,
        created_on: thread.created_on
    }
}

async function getThreadWithReplies(board, threadId) {
    const threadWithReplies = await Thread.aggregate([
        {
            $match: {
                boardName: board,
                _id: new mongoose.Types.ObjectId(threadId)
            }
        },
        {
            $project: {
                _id: 1,
                text: 1,
                created_on: 1,
                bumped_on: 1,
                replies: {
                    $map: {
                        input: '$replies',
                        as: 'reply',
                        in: {
                            _id: '$$reply._id',
                            text: '$$reply.text',
                            created_on: '$$reply.created_on'
                        }
                    }
                }
            }
        }
    ]);

    return threadWithReplies[0];
}

async function reportReply(board, replyId) {
    return null;
}

async function deleteReply(board, deletePassword, threadId, replyId) {
    const thread = await Thread.findOne({
        _id: threadId,
        boardName: board,
        'replies._id': replyId
    }, { 'replies.$': 1 });
    if (!thread) {
        throw new Error(`Reply could not be deleted. Thread or reply not found for given board and ids`);
    }

    const passwordHash = thread.replies[0].delete_password;
    const isCorrectPassword = await comparePassword(deletePassword, passwordHash);
    if (!isCorrectPassword) {
        return 'incorrect password';
    }

    await Thread.updateOne(
        { _id: threadId, 'replies._id': replyId },
        { $set: { 'replies.$.text': '[deleted]' } }
    );
    return 'success';
}

exports.createReply = createReply;
exports.getThreadWithReplies = getThreadWithReplies;
exports.reportReply = reportReply;
exports.deleteReply = deleteReply;
