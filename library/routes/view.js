const express = require('express');
const router = express.Router();
const http = require('http')
router.get('/', (req, res) => {
    http.get("http://localhost:3000/api/books/", (res2) => {
        let rowData = '';
        res2.setEncoding('utf8')
        res2.on('data', (chunk) => rowData += chunk)
        res2.on('end', () => {
            const booklist = JSON.parse(rowData);
            res.render('index', {
                title: 'Главная', books: booklist
            })

        })
    }).on('error', (err) => {
        console.error(err)
    })

});

router.get('/view/:id', (req, res) => {
    const { id } = req.params;
    http.get("http://localhost:3000/api/books/" + id, (res2) => {
        let rowData = '';
        res2.setEncoding('utf8')
        res2.on('data', (chunk) => rowData += chunk)
        res2.on('end', () => {
            const book = JSON.parse(rowData);
            res.render('books/view', {
                title: `${book.title} - просмотр`, book: book
            });

        })
    }).on('error', (err) => {
        console.error(err)
    })
});

router.get('/create/', (req, res) => {
    res.render('books/create_or_update', {
                title: "Создать книгу", method: "POST"
            });
});

module.exports = router;