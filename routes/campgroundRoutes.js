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
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });

router.get('/', wrapAsync(Camp.Index))
router.get('/new', isLoggedIn, Camp.New)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, wrapAsync(Camp.NewPost))

router.get('/:id/edit', isAuthor,wrapAsync(Camp.Edit))
router.patch('/:id', isLoggedIn, isAuthor, upload.array('image'), wrapAsync(async(req, res, next)=>{
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.image.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));
router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(Camp.Delete))

router.get('/:id', wrapAsync(Camp.Show))
module.exports = router;