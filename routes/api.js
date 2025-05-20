'use strict';

const { validatePassword, validateText, validateId } = require("../middleware/validators");
const threadController = require('../controllers/threadController');
const replyController = require('../controllers/replyController');

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post([validateText, validatePassword], async (req, res) => {
            const board = req.params.board;
            const { text, delete_password: deletePassword } = req.body;

            try {
                const thread = await threadController
                    .createThread(board, text, deletePassword);
                return res.status(200).json(thread);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .get(async (req, res) => {
            const board = req.params.board;

            try {
                const boardOverview = await threadController.getRecentThreads(board);
                return res.status(200).json(boardOverview);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .put(validateId({ in: 'body', fieldName: 'thread_id' }), async (req, res) => {
            const board = req.params.board;
            const { thread_id: threadId } = req.query;

            try {
                const reported = await threadController.reportThread(board, threadId);
                return res.status(200).json(reported);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .delete(
            validateId({ in: 'body', fieldName: 'thread_id' }),
            async (req, res) => {
                const board = req.params.board;
                const {
                    delete_password: deletePassword,
                    thread_id: threadId
                } = req.body;

                try {
                    const result = await threadController
                        .deleteThread(board, deletePassword, threadId);
                    return res.status(200).json(result);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: error.message });
                }
            });

    app.route('/api/replies/:board')
        .post([
            validateId({ in: 'body', fieldName: 'thread_id' }),
            validatePassword
        ], async (req, res) => {
            const board = req.params.board;
            const {
                text,
                delete_password: deletePassword,
                thread_id: threadId
            } = req.body;

            try {
                const threadWithReply = await replyController
                    .createReply(board, text, deletePassword, threadId);
                return res.status(200).json(threadWithReply);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .get(
            validateId({ in: 'query', fieldName: 'thread_id' }),
            async (req, res) => {
                const board = req.params.board;
                const { thread_id: threadId } = req.query;

                try {
                    const threadWithReplies = await replyController
                        .getThreadWithReplies(board, threadId);
                    return res.status(200).json(threadWithReplies);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: error.message });
                }
            })
        .put(validateId({ in: 'body', fieldName: 'reply_id' }), async (req, res) => {
            const board = req.params.board;
            const { reply_id: replyId } = req.query;

            try {
                const reported = await replyController.reportReply(board, replyId);
                return res.status(200).json(reported);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .delete(
            [
                validateId({ in: 'body', fieldName: 'thread_id' }),
                validateId({ in: 'body', fieldName: 'reply_id' })
            ],
            async (req, res) => {
                const board = req.params.board;
                const {
                    delete_password: deletePassword,
                    thread_id: threadId,
                    reply_id: replyId
                } = req.body;

                try {
                    const result = await replyController
                        .deleteReply(board, deletePassword, threadId, replyId);
                    return res.status(200).json(result);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: error.message });
                }
            });

};
