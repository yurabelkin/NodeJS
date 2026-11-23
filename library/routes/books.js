const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const uploader = require('../middleware/upload.js');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const COUNTER_URL = process.env.COUNTER_URL || 'http://localhost:3001';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:library@localhost:27017/appdb';

//MobgoDB Functions - start

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

//MobgoDB Functions - end

mongoStart();

class Book {
    constructor(id = uuid(), title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
        mongoSave(this);
    }
}

// тестовые данные
async function initData() {

    const savedBooks = await mongoFind();
    let books = [];
    if (savedBooks.length == 0) {
        books.push(new Book(uuid(), 'Заглавие1', 'Книга по теме1', 'Иванов И.И., Петров П.П.', '', 'https://images.eksmo.ru/images/covers_01_min.jpg', ''));
        books.push(new Book(uuid(), 'Заглавие2', 'Книга по теме2', 'Иванов И.И., Петров П.П.', '', 'https://images.eksmo.ru/images/covers_01_min.jpg', ''));
    }
    else {
        books = savedBooks;
    }
    return books;
}

initData();

function findBook(id) {
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        return idx;
    }
    else { return false; }
}


function getViews(bookId) {
    return new Promise((resolve) => {
        const req = http.get(COUNTER_URL + "/" + bookId, (res2) => {
            let rowData = '';
            res2.setEncoding('utf8');
            res2.on('data', (chunk) => rowData += chunk);
            res2.on('end', () => {
                try {
                    resolve(JSON.parse(rowData).count);
                } catch {
                    resolve(0);
                }
            });
        });
        req.on('error', (err) => {
            console.error(err);
            resolve(0); // при ошибке — 0, но не роняем весь запрос
        });
        req.setTimeout(2000, () => {
            req.destroy();
            resolve(0);
        });
    });
}

router.get('/', async (req, res) => {
    const books = await mongoFind();

    const result = await Promise.all(
        books.map(async (book) => {
            const views = await getViews(book.id);
             return { ...book.toObject(), views };
        })
    );

    res.status(200).json(result);
});

/*router.post('/', (req, res) => {
    console.log(req.body);

    if (req.body.title && req.body.authors) {
        const textBody = req.body;
        const uploader = require('../middleware/upload.js');
        uploader.single('book'), (req, res) => {
            if (req.file) {
                console.log(req.file);
                
            }
            let newbook = new Book(uuid(), textBody.title, textBody.description, textBody.authors, textBody.favorite, textBody.fileCover, textBody.fileName, req.file);
            books.push(newbook);
            res.json(newbook);
            res.status(200);
        }
        res.status(400);
    }
});
*/

router.post('/', uploader.single('book'), (req, res) => {

    if (req.body.title && req.body.authors) {
        let newbook = new Book(uuid(), req.body.title, req.body.description, req.body.authors, req.body.favorite, req.body.fileCover, req.body.fileName, req.file.destination + "/" + req.file.filename);
        res.json(newbook);
        res.status(200);
    }
    else {
        res.status(400);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let curbook = await mongoFind({ id: id });
    if (typeof curbook === 'object' && curbook[0].id) {

        // incr счетчика
        const counterUrl = new URL(COUNTER_URL);
        const incrReq = http.request({
            hostname: counterUrl.hostname,
            port: counterUrl.port || 3001,
            path: '/' + id + '/incr',
            method: 'POST',
        });

        incrReq.on('error', (err) => console.error(err));
        incrReq.end();

        res.status(200);
        res.json(curbook[0]);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;
    let curbook = await mongoFind({ id: id });
    if (curbook) {
        res.status(200);
        res.sendFile(curbook[0].fileBook, { root: path.join(__dirname, '../') })
    } else {
        res.status(404);
    }
});

router.put('/:id', uploader.single('book'), async (req, res) => {
    const { id } = req.params;
    let update = {
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
        fileCover: req.body.fileCover,
        fileName: req.body.fileName,
    };
    let curbook = await mongoUpdate({ id: id }, update);

    if (curbook != null) {
        res.status(200).json(curbook);
    } else {
        res.status(404).json('404 | книга не найдена');
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const filter = { id: id };
    let delbook = await mongoDelete({ id: id });
    if (delbook !== false) {
        res.status(200);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});


module.exports = router;