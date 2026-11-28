const crypto = require('crypto');
const db = require('../db/db.js');
const salt = "BESTLIB";

async function verify(login, password, done) {
    if (!login || !password){
        return done(null, false)
    }
    const users = await db.mongoFindUser({ login: login });
    const user  = users[0];
    const hash = crypto.createHash('md5').update(password + salt).digest('hex');
    if (hash === user.password){
        return done(null, user) 
    }
    else {
        return done(null, false)
    }
}

async function findUser(login, cb) {
    const users = await db.mongoFindUser({ login: login });
    const user  = users[0];
    return user;
}

async function createUser(user) {
    const newuser = await db.mongoCreateUser({
        login: user.login,
        email: user.email,
        name: user.name,
        password: crypto.createHash('md5').update(user.password + salt).digest('hex')
    });
    return newuser;
}


module.exports = { verify, findUser, createUser };