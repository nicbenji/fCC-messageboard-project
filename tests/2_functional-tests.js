const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const server = require('../server');
const Thread = require('../model/thread');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    let threadId;
    let threadId2;
    let replyId;
    const delThreadPassword = 'testthread123';
    const delReplyPassword = 'testreply123';

    setup(async () => {
        const thread = await chai.request(server)
            .post('/api/threads/test')
            .send({ text: 'Test thread', delete_password: delThreadPassword });

        assert.equal(thread.status, 200);
        assert.property(thread.body, '_id');

        threadId = thread.body._id;

        const threadWithReply = await chai.request(server)
            .post('/api/replies/test')
            .send({
                thread_id: threadId,
                text: 'Test first reply',
                delete_password: delReplyPassword
            });

        assert.equal(threadWithReply.status, 200);
        assert.property(threadWithReply.body, 'replies');
        assert.property(threadWithReply.body.replies[0], '_id');

        replyId = threadWithReply.body.replies[0]._id;
    });

    teardown(async () => {
        if (threadId) await Thread.deleteOne({ _id: threadId });
        if (threadId2) await Thread.deleteOne({ _id: threadId2 });
    });


    test('should create a new thread', (done) => {
        chai.request(server)
            .post('/api/threads/test')
            .send({ text: 'Test thread 2', delete_password: 'test123' })
            .end((_err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, '_id');
                assert.propertyVal(res.body, 'text', 'Test thread 2');
                assert.property(res.body, 'replies');
                assert.property(res.body, 'created_on');
                assert.property(res.body, 'bumped_on');
                threadId2 = res.body._id;
                done();
            });
    });

    test('should fetch the 10 most recent threads with their 3 most recent replies', (done) => {
        chai.request(server)
            .get('/api/threads/test')
            .end((_err, res) => {
                assert.equal(res.status, 200);
                assert.isAtMost(res.body.length, 10);

                assert.property(res.body[0], '_id');
                assert.property(res.body[0], 'text');
                assert.property(res.body[0], 'replies');
                assert.property(res.body[0], 'created_on');
                assert.property(res.body[0], 'bumped_on');

                assert.isAtMost(res.body[0].replies.length, 3);
                done();
            });
    });

    test('should not delete a thread on incorrect password', (done) => {
        chai.request(server)
            .delete('/api/threads/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should delete a thread with the correct password', (done) => {
        chai.request(server)
            .delete('/api/threads/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should report a thread', (done) => {
        chai.request(server)
            .put('/api/threads/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should create a new reply', (done) => {
        chai.request(server)
            .post('/api/replies/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should fetch a thread with all replies', (done) => {
        chai.request(server)
            .get('/api/replies/test?thread_id=' + threadId)
            .end((err, res) => {
                done();
            });
    });

    test('should not delete a reply with an incorrect password', (done) => {
        chai.request(server)
            .delete('/api/replies/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should delete a reply with a correct password', (done) => {
        chai.request(server)
            .delete('/api/replies/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

    test('should report a reply', (done) => {
        chai.request(server)
            .put('/api/replies/test')
            .send({})
            .end((err, res) => {
                done();
            });
    });

});
