'use strict';

const { validatePassword, validateBoard, validateText } = require("../middleware/validators");

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post([validateBoard, validateText, validatePassword], (req, res) => {
            const { board, text, delete_password: deletePassword } = req.body;
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
