'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = Schema({
    displayName: String,
    avatar: String,
    password: { type: String },
    email: { type: String, unique: true, lowercase: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', function(next) {
    let user = this
    console.log(user)
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            console.log(user.password)
            if (err) return next(err)

            user.password = hash
            console.log(hash)
            next()
        })
    })
})

module.exports	= mongoose.model('User', UserSchema);
