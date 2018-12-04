'use strict'

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BookSchema = new mongoose.Schema({
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
});

BookSchema.plugin(mongoosePaginate);

module.exports	= mongoose.model('Book', BookSchema);
