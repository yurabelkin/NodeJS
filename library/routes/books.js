const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const uploader = require('../middleware/upload.js');
const path = require('path');

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
    }
}

// тестовые данные
const books = [];
books.push(new Book(uuid(), 'Заглавие1', 'Книга по теме1', 'Иванов И.И., Петров П.П.', '', '', ''));
books.push(new Book(uuid(), 'Заглавие2', 'Книга по теме2', 'Иванов И.И., Петров П.П.', '', '', ''));


function findBook(id) {
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        return idx;
    }
    else { return false; }
}


router.get('/', (req, res) => {
    res.status(200);
    res.json(books);
}
);

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
        books.push(newbook);
        res.json(newbook);
        res.status(200);
    }
    else {
        res.status(400);
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    curbook = findBook(id)

    if (curbook !== false) {
        res.status(200);
        res.json(books[curbook]);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    curbook = findBook(id)
    if (curbook !== false) {
        res.status(200);
        res.sendFile(books[curbook].fileBook, { root: path.join(__dirname, '../') })
    } else {
        res.status(404);
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    let curbook = findBook(id)
    if (curbook !== false) {
        books[curbook].title = req.body.title;
        books[curbook].description = req.body.description;
        books[curbook].authors = req.body.authors;
        books[curbook].favorite = req.body.favorite;
        books[curbook].fileCover = req.body.fileCover;
        books[curbook].fileName = req.body.fileName;
        res.status(200);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    curbook = findBook(id)

    if (curbook !== false) {
        books.splice(curbook, 1);
        res.status(200);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});


module.exports = router;