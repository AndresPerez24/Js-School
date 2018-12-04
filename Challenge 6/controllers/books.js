const Book = require("../models/books");
const fetch = require("node-fetch");
const config = require("../config");

function createMultipleBooks(req, resolve, reject) {
  const isbn = req.body.isbn;
  const city = req.body.city;
  const copies = req.body.copies;
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  let book = new Book();
  book.bookshelf = city;
  book.copies = copies;
  book.availableCopies = copies;

  async function getBook(url) {
    try {
      const content = await fetch(url).then(async res => res.json());
      book.title = content.items[0].volumeInfo.title;
      book.authors = content.items[0].volumeInfo.authors;
      book.publisher = content.items[0].volumeInfo.publisher;
      book.publishedDate = content.items[0].volumeInfo.publishedDate;
      book.description = content.items[0].volumeInfo.description;
      book.pageCount = content.items[0].volumeInfo.pageCount;
      book.printType = content.items[0].volumeInfo.printType;
      book.categories = content.items[0].volumeInfo.categories;
      book.averageRating = content.items[0].volumeInfo.averageRating;
      book.imageLink = content.items[0].volumeInfo.imageLinks.thumbnail;
      book.language = content.items[0].volumeInfo.language;

      book.save((err, bookStored) => {
        if (err) {
          reject(`Error saving the book ${bookStored.title}`);
        } else {
          resolve(`'${bookStored.title}' saved`);
        }
      });
    } catch (err) {
      reject(`Error making the request`);
    }
  }
  getBook(url);
}

async function getAllBooks(req, res) {
  const { bookshelf, search } = req.query;
  if (search) {
    const regex = new RegExp(`${search}`,'i');
    const query = { title: { $regex: regex } }
      if (bookshelf) {
        query.bookshelf = bookshelf
      }
    const books = await Book.find(query);
    res.send({books});
  } else if (bookshelf) {
    Book.find({ bookshelf }, (err, books) => {
      if (err) {
        res.status(500).send({
          message: `Error making the request ${err}`
        });
      } else if (!books) {
        res.status(404).send({
          message: "We do not have books at the moment"
        });
      } else {
        res.status(200).send({
          books
        });
      }
    });
  } else {
    Book.find({}, (err, books) => {
      if (err) {
        res.status(500).send({
          message: `Error making the request ${err}`
        });
      } else if (!books) {
        res.status(404).send({
          message: "We do not have books right now"
        });
      } else {
        res.status(200).send({
          books
        });
      }
    });
  }
}

function getBook(req, res) {
  let bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) {
      res.status(500).send({
        message: `Error making the request ${err}`
      });
    } else if (!book) {
      res.status(404).send({
        message: "That book does not exist"
      });
    } else {
      res.status(200).send({
        book
      });
    }
  });
}

function lendBook(req, res) {
  let bookId = req.params.bookId;
  Book.findById(bookId, (err, book) => {
    if (err) {
      res.status(500).send({
        message: `Error making the request ${err}`
      });
    } else if (!book) {
      res.status(404).send({
        message: "That book does not exist"
      });
    } else if (book.availableCopies <= 0) {
      res.status(404).send({
        message: `There aren't enought available books: ${book.availableCopies}`
      });
    } else {
      Book.findOneAndUpdate(
        { _id: bookId },
        {
          $inc: {
            availableCopies: -1
          }
        },
        (err, bookUpdated) => {
          if (err) {
            res.status(500).send({
              message: `Error making the request ${err}`
            });
          } else {
            res.status(200).send({
              bookUpdated
            });
          }
        }
      );
    }
  });
}

module.exports = {
  getAllBooks,
  getBook,
  lendBook,
  createMultipleBooks
};
