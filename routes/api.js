'use strict';

module.exports = function(app) {

    app.route('/api/threads/:board')
        .post((req, res) => {
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
