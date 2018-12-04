'use strict'

const express = require('express');
const api = express.Router();
const bookControllers = require('../controllers/books');
const user = require('../middlewares/user')
const userCtrl = require('../controllers/user')
const isAuth = require('../middlewares/user')

api.get('/books', isAuth, bookControllers.getAllBooks)
api.get('/books/:bookId', isAuth, bookControllers.getBook);
api.put('/books/:bookId/lend', isAuth, bookControllers.lendBook);
api.post('/signup', userCtrl.signUp)
api.post('/login', userCtrl.login)
api.get('/private', user, (req, res) => {
    res.status(200).send({ message: 'You have access' })
})

module.exports = api
