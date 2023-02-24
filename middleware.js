const Campground = require('./models/campground');
const { campgroundSchema } = require('./schema.js');
const Review = require('./models/reviews');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
//req.session.returnTo is used to store the url for the page you were about to visit 
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
const { error } = campgroundSchema.validate(req.body);
if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ErrorClass(msg, 400);
} else {
    next();
}
}

module.exports.isAuthor = async (req,res,next)=>{
const user = await Campground.findById(req.params.id);
if(!user.author.equals(req.user.id)){
    req.flash('error', "You Don't have premission to do that!!");
    res.redirect(`/campgrounds/${req.params.id}`);
}
else{
    next();
}
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const user = await Review.findById(req.params.reviewId);
    if(!user.author.equals(req.user.id)){
        req.flash('error', "You Don't have premission to do that!!");
        res.redirect(`/campgrounds/${req.params.id}`);
    }
    else{
        next();
    }
    }