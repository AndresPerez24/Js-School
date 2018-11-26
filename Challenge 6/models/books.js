'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
    title: String,
    authors: [String],
    imageLink: String,
    publishedDate: String,
    description: String,
    pageCount: Number,
    averageRating: Number,
    copies: Number,
    availableCopies: Number,
    bookshelf: { type: String, enum: ['Quito', 'Cartagena', 'Medellin', 'Digital', 'Personal Loans']}
})

module.exports	= mongoose.model('Book', BookSchema);
