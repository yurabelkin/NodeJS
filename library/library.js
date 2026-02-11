#!/usr/bin/env node
const express = require('express');
const app = express();
app.listen(3000);
const { v4: uuid } = require('uuid')

class Book {
    constructor(id = uuid(), title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
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

app.post('/api/user/login', (req, res) => {
    let testobj = { id: 1, mail: "test@mail.ru" };
    res.status(201);
    res.json(testobj);
}
);


app.get('/api/books', (req, res) => {
    res.status(200);
    res.json(books);
}
);

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books', (req, res) => {
    if (req.title && req.authors) {
        let newbook = new Book(uuid(), req.title, req.description, req.authors, req.favorite, req.fileCover, req.fileName);
        books.push(newbook);
        res.json(newbook);
        res.status(200);
    }
});

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    let curbook = findBook(id)
    console.log(req.body);
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

app.delete('/api/books/:id', (req, res) => {
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
