'use strict'

const express = require('express');
const api = express.Router();
const bookControllers = require('../controllers/books');
const user = require('../middlewares/user')
const userCtrl = require('../controllers/user')

api.get('/books', user, bookControllers.getAllBooks)
api.get('/books/:bookId', user, bookControllers.getBook);
api.put('/books/:bookId/lend', user, bookControllers.lendBook);
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', user, (req, res) => {
    res.status(200).send({ message: 'You have access' })
})

module.exports = api