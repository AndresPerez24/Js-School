'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const bookControllers = require('./controllers/books');

const books = [
  {
    body: {
      isbn: '9780735619678',
      city: 'Cartagena',
      copies: 2
    }
  },
  {
    body: {
      isbn: '9780132713764',
      city: 'Medellin',
      copies: 1
    }
  },
  {
    body: {
      isbn: '9781351030366',
      city: 'Quito',
      copies: 5
    }
  },
  {
    body: {
      isbn: '9780321680563',
      city: 'Cartagena',
      copies: 3
    }
  },
  {
    body: {
      isbn: '9780123850041',
      city: 'Quito',
      copies: 2
    }
  },
  {
    body: {
      isbn: '9781430228028',
      city: 'Medellin',
      copies: 0
    }
  },
  {
    body: {
      isbn: '9789863470229',
      city: 'Personal Loans',
      copies: 2
    }
  },
  {
    body: {
      isbn: '9780132713757',
      city: 'Digital',
      copies: 1
    }
  },
  {
    body: {
      isbn: '9781430249771',
      city: 'Personal Loans',
      copies: 3
    }
  },
  {
    body: {
      isbn: '9781449308926',
      city: 'Digital',
      copies: 4
    }
  },
  {
    body: {
      isbn: '9780692232699',
      city: 'Quito',
      copies: 1
    }
  },
  {
    body: {
      isbn: '9780071823029',
      city: 'Cartagena',
      copies: 2
    }
  },
  {
    body: {
      isbn: '9781849698825',
      city: 'Personal Loans',
      copies: 4
    }
  }
  ,
  {
    body: {
      isbn: '9781329115941',
      city: 'Digital',
      copies: 0
    }
  }
];

mongoose.connect(
  config.db,
  (err, res) => {
    if (err) {
      throw console.log(`error to connect with database ${err}`);
    } else {
      console.log('Database connection established');

      let promises = books.map(book => {
        let poblate = new Promise((resolve, reject) => {
          bookControllers.createMultipleBooks(book, resolve, reject);
        });
        return poblate;
      });

      Promise.all(promises)
        .then(resolve => {
          resolve.map(res => {
            console.log(res);
          });
          console.log('Database populated!');

          mongoose.disconnect();
        })
        .catch(res => {
          console.log(res);
          mongoose.disconnect();
        });
    }
  }
);
