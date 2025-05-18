'use strict';

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post((req, res) => {
            const { board, text, deletePassword } = req.body;

            if (!board) {
                res.status(400).json({ error: 'Board name needs to be specified' });
            }
            if (!text || text.trim() === '') {
                res.status(400).json({ error: 'Thread needs to have text' });
            }
            if (!deletePassword) {
                res.status(400).json({ error: 'Thread needs to have a delete password' });
            }
            if (deletePassword.length < 8) {
                res.status(400).json({ error: 'Password must have at least 8 chars' });
            }
            if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^'])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/.test(deletePassword)) {
                res.status(400).json({ error: 'Password must contain at least one letter, number and special character' });
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
