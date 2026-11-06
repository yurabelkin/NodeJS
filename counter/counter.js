const express = require('express');

const app = express();

app.listen(3001);

const counterRouter = require('./routes/main.js');
app.use('/', counterRouter);
