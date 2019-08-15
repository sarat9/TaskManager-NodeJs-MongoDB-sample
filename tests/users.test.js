const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const utils = require('../src/utils/utils')
const { User } = require('../src/model/models')


const testUserId = '5d55981e65e66d12c4b5703e' //new mongoose.Types.ObjectId();
const newTestUser = {
    _id: testUserId,
    name: 'testuser',
    email: 'test@test.com',
    password: 'test'
}
const testToken = jwt.sign({ _id: testUserId }, utils.envProps.getProperty('JWT_SECRET_KEY'));


beforeEach(async () => {
    // console.log("before each test case")
})

describe('Users APIs', () => {
    it('Should get about string', async () => {
        await request(app).get('/auth/about').send().expect(200)
    })

    it('Should signup a new user', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send(newTestUser)
            .expect(200);

        // Assertion to check if it saved correctly
        const user = await User.findById(response.body._id);
        expect(user).not.toBeNull()
        expect(user.name).toBe('testuser')
        expect(user.password).not.toBe('password')

    })

    it('Should login user', async () => {
        await request(app).post('/auth/login').send({
            email: 'test@test.com',
            password: 'test'
        }).expect(200)
    })

    it('Should deny login to non user', async () => {
        await request(app).post('/auth/login').send({
            email: 'test@test.com',
            password: 'testnot'
        }).expect(400)
    })

    it('Should allow valid X-Auth-Token get users data ', async () => {
        await request(app).get('/api/users')
            .set('x-auth-token', testToken)
            .send()
            .expect(200)
    })

    it('Should NOT allow valid X-Auth-Token get users data ', async () => {
        await request(app).get('/api/users')
            .set('x-auth-token', 'fake-x-auth-token')
            .send()
            .expect(400)
    })

})

