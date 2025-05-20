const Thread = require("../model/thread");
const { hashPassword } = require("./hashPassword");

async function createThread(board, text, deletePassword) {
    const passwordHash = await hashPassword(deletePassword);

    const newThread = new Thread({
        boardName: board,
        text,
        delete_password: passwordHash
    });

    const result = await newThread.save();

    return {
        _id: result._id,
        text: result.text,
        replies: result.replies,
        bumped_on: result.bumped_on,
        created_on: result.created_on
    }
}

async function getRecentThreads(board) {
    return null;
}

async function reportThread(board, threadId) {
    return null;
}

async function deleteThread(board, deletePassword, threadId) {
    return null;
}

exports.createThread = createThread;
exports.getRecentThreads = getRecentThreads;
exports.reportThread = reportThread;
exports.deleteThread = deleteThread;
