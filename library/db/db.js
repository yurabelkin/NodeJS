const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:library@localhost:27017/appdb';

async function mongoStart() {
    try {
        await mongoose.connect(MONGO_URL);
    }
    catch (e) {
        console.log(e);
    }
}

function mongoSave(book) {
    const Book = require('../models/books.js');
    const Newbook = new Book(book);
    try {
        Newbook.save();
    }
    catch (e) {
        console.log(e);
    }
}

async function mongoFind(condition) {
    try {
        const Book = require('../models/books.js');
        const Foundbook = await Book.find(condition).select('-_id -__v');
        return Foundbook;
    }
    catch (e) {
        console.log(e);
    }
}

async function mongoUpdate(filter, update) {
    try {
        const Book = require('../models/books.js');
        const Curbook = await Book.findOneAndUpdate(filter, update, { new: true });
        return Curbook;
    }
    catch (e) {
        console.log(e);
    }
}

async function mongoDelete(filter) {
    try {
        const Book = require('../models/books.js');
        const delResult = await Book.deleteOne(filter);
        if (delResult.deletedCount == 1) {
            return true;
        }
        else { return false; }
    }
    catch (e) {
        console.log(e);
    }
}

async function mongoFindUser(condition) {
    try {
        const User = require('../models/users.js');
        const FoundUser = await User.find(condition).select('-_id -__v');
        return FoundUser;
    }
    catch (e) {
        console.log(e);
    }
}

async function mongoCreateUser(user) {
    const User = require('../models/users.js');
    const Newuser = new User(user);
    try {
        Newuser.save();
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    mongoStart,
    mongoSave,
    mongoFind,
    mongoUpdate,
    mongoDelete,
    mongoFindUser,
    mongoCreateUser
}