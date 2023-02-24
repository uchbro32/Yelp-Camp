const Campground = require('../../models/campground');
const Review = require('../../models/reviews');
const { reviewSchema } = require('../../schema.js');

module.exports.New = async(req, res)=>{
    const Id = req.params.id;
    const campground = await Campground.findById(Id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully created your review!!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.Delete = async(req,res)=>{
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted your review!!');
    res.redirect(`/campgrounds/${id}`);
}