'user strict';

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');
const bcrypt = require('bcrypt-nodejs');

function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save(err => {
    if (err)
      res.status(500).send({
        message: `Error when creating the user: ${err}`
      });
    return res.status(201).send({ token: service.createToken(user) });
  });
}

function login(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'There is no user' });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(!result) return res.status(404).send({message: 'Invalid password'})
        req.user = user;
        res.status(200).send({
          message: 'you have successfully logged in',
          token: service.createToken(user)
        });
    })
  });
}

module.exports = {
  signUp,
  login
};
