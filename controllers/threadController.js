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

    const threads = await Thread.aggregate([
        { $match: { boardName: board } },
        { $sort: { bumped_on: -1 } },
        { $limit: 10 },
        {
            $project: {
                _id: 1,
                text: 1,
                created_on: 1,
                bumped_on: 1,
                replies: {
                    $map: {
                        input: { $slice: ['$replies', -3] },
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

    return threads;
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
