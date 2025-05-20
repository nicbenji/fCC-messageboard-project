const Thread = require("../model/thread");
const { hashPassword } = require("./hashPassword");

async function createThread(board, text, deletePassword) {
    const passwordHash = await hashPassword(deletePassword);

    const newThread = new Thread({
        board,
        text,
        delete_password: passwordHash
    });

    return await newThread.save();
}

function getRecentThreads(board) {
    return null;
}

function reportThread(board, threadId) {
    return null;
}

function deleteThread(board, deletePassword, threadId) {
    return null;
}

exports.createThread = createThread;
exports.getRecentThreads = getRecentThreads;
exports.reportThread = reportThread;
exports.deleteThread = deleteThread;
