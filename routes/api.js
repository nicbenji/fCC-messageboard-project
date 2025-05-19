'use strict';

const validatePassord = require("../middleware/validatePassord");

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post(validatePassord, (req, res) => {
            const { board, text, delete_password: deletePassword } = req.body;

            if (!board) {
                res.status(400).json({ error: 'Board name needs to be specified' });
            }
            if (!text || text.trim() === '') {
                res.status(400).json({ error: 'Thread needs to have text' });
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
