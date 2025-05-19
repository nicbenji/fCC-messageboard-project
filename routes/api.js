'use strict';

const { validatePassword, validateBoard, validateText } = require("../middleware/validators");
const threadController = require('../controllers/threadController');
const replyController = require('../controllers/replyController');

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post([validateBoard, validateText, validatePassword], (req, res) => {
            const { board, text, delete_password: deletePassword } = req.body;

            try {
                const thread = threadController.createThread(board, text, deletePassword);
                return res.status(200).json(thread);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message });
            }
        })
        .get((req, res) => {
        })
        .delete((req, res) => {
        });

    app.route('/api/replies/:board')
        .put((req, res) => {
        })
        .post((req, res) => {
        })
        .get((req, res) => {
        })
        .delete((req, res) => {
        });

};
