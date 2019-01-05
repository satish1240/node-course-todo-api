const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    todo.deleteMany({}).then(() => {
        return todo.insertMany(todos);
    }).then(() => done());

});

describe(' POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                todo.find({ text }).then((todoslist) => {
                    expect(todoslist.length).toBe(1);
                    expect(todoslist[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });

    });


    it('should not create a new todo with invalid data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                todo.find().then((todoslist) => {
                    expect(todoslist.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });

    });


});


describe(' GET /todos', () => {
    it('should GET all todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todoslist.length).toBe(2);
            })
            .end(done);

    });
});

describe(' GET /todos/:id', () => {
    it('should GET todo id ', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todoid.text).toBe(todos[0].text);;
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                todo.find({ _id: todos[0]._id }).then((todoid) => {
                    expect(todoid.length).toBe(1);
                    done();
                }).catch((e) => done(e));

            });

    });

    it('should GET todo id 404  if not found', (done) => {

        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);

    });

    it('should GET todo id 400  if not valid', (done) => {

        request(app)
            .get(`/todos/1234`)
            .expect(400)
            .end(done);

    });
});

describe(' DELETE /todos/:id', () => {
    it('should DELETE todo id ', (done) => {

        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todoid.text).toBe(todos[0].text);;
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                todo.findById(todos[0]._id).then((todoid) => {
                    expect(todoid).toBeFalsy();
                    done();
                }).catch((e) => done(e));

            });

    });

    it('should DELETE todo id 404  if not found', (done) => {

        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);

    });

    it('should DELETE todo id 400  if not valid', (done) => {

        request(app)
            .delete(`/todos/1234`)
            .expect(400)
            .end(done);

    });
});