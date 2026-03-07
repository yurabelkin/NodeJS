#!/usr/bin/env node

const express = require('express');

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

const viewRouter = require('./routes/view.js');
const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');


app.use('/', viewRouter);
app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);
