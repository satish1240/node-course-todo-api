const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { todo } = require('./../models/todo');

const todos = [{
    text: 'First test todo'
}, {
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