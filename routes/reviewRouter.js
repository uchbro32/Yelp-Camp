const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/reviews');
const { reviewSchema } = require('../schema.js');
const ErrorClass = require('../utilities/errorClass');
const wrapAsync = require('../utilities/wrapAsync');
const Campground = require('../models/campground');
const reviewss = require('./Controllers/reviews');

const { isLoggedIn, isReviewAuthor } = require('../middleware');

const router = express.Router({mergeParams: true});

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ErrorClass(msg, 400)
    } else {
        next();
    }
}

router.post('', isLoggedIn, validateReview, wrapAsync(reviewss.New))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor,wrapAsync(reviewss.Delete))

module.exports = router;