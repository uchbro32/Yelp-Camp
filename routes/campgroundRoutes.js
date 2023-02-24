const ErrorClass = require('../utilities/errorClass');
const wrapAsync = require('../utilities/wrapAsync');
const Campground = require('../models/campground');
const mongoose = require('mongoose');
const { isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const passport = require('passport');
const express = require('express');
const campground = require('../models/campground');
const router = express.Router();
const Camp = require('./Controllers/camp');


router.get('/', wrapAsync(Camp.Index))

router.get('/new', isLoggedIn, Camp.New)

router.post('/', validateCampground, isLoggedIn, wrapAsync(Camp.NewPost))

router.get('/:id/edit', isAuthor,wrapAsync(Camp.Edit))

router.patch('/:id', isLoggedIn, isAuthor, wrapAsync(Camp.Patch));

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(Camp.Delete))

router.get('/:id', wrapAsync(Camp.Show))


module.exports = router