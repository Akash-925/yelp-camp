const express = require('express');
const passport = require('passport');
const router = express.Router();
const users = require('../controllers/users');
const User = require('../models/user');
const WrapAsync = require('../utils/WrapAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(WrapAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;