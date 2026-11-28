const express = require('express');
const router = express.Router();
const passport = require('passport')
const userHelper = require('../middleware/password.js');



router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/user/me',
    failureRedirect: '/api/user/login',
}));


router.post('/signup', async (req, res, next) => {
    try {
        await userHelper.createUser({
            login: req.body.login,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
        });
        return res.status(201).json({ message: 'Пользователь создан' });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;