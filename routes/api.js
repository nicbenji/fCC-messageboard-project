'use strict';

const { validatePassword, validateText, validateId } = require("../middleware/validators");
const threadController = require('../controllers/threadController');
const replyController = require('../controllers/replyController');

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post([validateText, validatePassword], (req, res) => {
            const board = req.params.board;
            const { text, delete_password: deletePassword } = req.body;

            try {
                const thread = threadController.createThread(board, text, deletePassword);
                return res.status(200).json(thread);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .get((req, res) => {
            const board = req.params.board;

            try {
                const boardOverview = threadController.getRecentThreads(board);
                return res.status(200).json(boardOverview);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .delete((req, res) => {
        });

    app.route('/api/replies/:board')
        .post(
            [validateId({ in: 'body', fieldName: 'thread_id' }), validatePassword],
            (req, res) => {
                const board = req.params.board;
                const { text, delete_password: deletePassword, thread_id: threadId } = req.body;

                try {
                    const threadWithReply = replyController
                        .createReply(board, text, deletePassword, threadId);
                    return res.status(200).json(threadWithReply);
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: error.message });
                }
            })
        .get(validateId({ in: 'query', fieldName: 'thread_id' }), (req, res) => {
            const board = req.params.board;
            const { thread_id: threadId } = req.query;

            try {
                const threadWithReplies = replyController
                    .getThreadWithReplies(board, threadId);
                return res.status(200).json(threadWithReplies);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .put((req, res) => {
        })
        .delete((req, res) => {
        });

};
