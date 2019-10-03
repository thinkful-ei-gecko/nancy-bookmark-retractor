process.env.TZ = 'UTC';
require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const makeBookmarks = require('./bookmarks.fixtures')


describe('Bookmarks Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db('bookmarks').truncate())
    afterEach('clean up', () => db('bookmarks').truncate())

    describe('GET bookmarks', () => {
        context('given no bookmarks', () => {
            it('respond with 200 and an empty array', () => {
                return supertest(app)
                    .get('/bookmarks')
                    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
                    .expect(200, [])
            })
        })
        context('given the database has bookmarks', () => {
            const testBookmarks = makeBookmarks()

            beforeEach('insert bookmarks', () => {
                return db
                    .into('bookmarks')
                    .insert(testBookmarks)
            })

            it('should responde with 200 and all of the articles', () => {
                return supertest(app)
                    .get('/bookmarks')
                    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
                    .expect(200, testBookmarks)
            })
        })
    })

    describe('GET /bookmarks/:bookmarkId', () => {
        context('given heres no article', () => {
            it('responds with 404', () => {
                const bookmarkId = 1234
                return supertest(app)
                    .get(`/bookmarks/${bookmarkId}`)
                    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
                    .expect(404, {error: {message: `couldnt find bookmark :(`}})
            })
        })
        context('given theres bookmarks', () => {
            const testBookmarks = makeBookmarks() 
            beforeEach('insert test bookmarks', () => {
                return db 
                    .into('bookmarks')
                    .insert(testBookmarks)
            })

            it('responds with 200 and the specifiec bookmark', () => {
                const bookmarkId = 2 
                const expectedBookmark = testBookmarks[bookmarkId - 1]

                return supertest(app)
                    .get(`/bookmarks/${bookmarkId}`)
                    .set('Authorization', 'Bearer ' + process.env.API_TOKEN)
                    .expect(200, expectedBookmark)
            })
        })
    })
});