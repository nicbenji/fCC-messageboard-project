'use strict';

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post((err, res) => {
        })
        .get((err, res) => {
        })
        .delete((err, res) => {
        });

    app.route('/api/replies/:board')
        .put((err, res) => {
        })
        .post((err, res) => {
        })
        .get((err, res) => {
        })
        .delete((err, res) => {
        });

};
