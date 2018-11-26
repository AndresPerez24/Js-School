'use strict'
const express = require('express');
const books = express.Router();
const bookControllers = require('../controllers/books');

books.get('/books', bookControllers.getAllBooks);

books.get('/books/:bookId', bookControllers.getBook);

books.put('/books/:bookId/lend', bookControllers.lendBook);

module.exports = books;