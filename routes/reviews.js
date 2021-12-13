const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const WrapAsync = require('../utils/WrapAsync');
const ExpressError = require("../utils/ExpressError");
const reviews = require('../controllers/reviews');

const Campground = require('../models/campground');
const Review = require('../models/review');

router.post('/', isLoggedIn, validateReview, WrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, WrapAsync(reviews.deleteReview))

module.exports = router;