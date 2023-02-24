const ErrorClass = require('../utilities/errorClass');
const wrapAsync = require('../utilities/wrapAsync');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const uuser = require('./Controllers/user') 

//For authentication stufff
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/register', uuser.registerGet)

router.post('/register', wrapAsync(uuser.registerPost))

router.get('/login', uuser.loginGet)

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), uuser.loginPost)

router.get('/logout', uuser.logout)


module.exports = router;