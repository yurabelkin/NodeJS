#!/usr/bin/env node

const express = require('express');

const app = express();

app.listen(3000);

const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');

app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);
