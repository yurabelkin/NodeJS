#!/usr/bin/env node

const express = require('express');

const app = express();

app.set("view engine", "ejs");


const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const viewRouter = require('./routes/view.js');
const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');

const userHelper = require('./middleware/password.js');

const options = {
    usernameField: "login",
    passwordField: "password",
}
passport.use('local', new LocalStrategy(options, userHelper.verify));
passport.serializeUser((user, cb) => {
    cb(null, user.login)
})

passport.deserializeUser(async (id, cb) => {
    try { cb(null, await userHelper.findUser(id) || false); }
    catch (err) { cb(err); }
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'BESTLIBRARY',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

app.use('/', viewRouter);
app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);

app.listen(3000);