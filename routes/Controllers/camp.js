const Campground = require('../../models/campground');
const { campgroundSchema } = require('../../schema.js');

module.exports.New = (req, res, next)=>{
    res.render('new.ejs');
}

module.exports.Index = async(req, res)=>{
    const campground = await Campground.find({});
    res.render('index.ejs', {campground});
}
module.exports.NewPost = async(req, res, next)=>{
    const campground = new Campground(req.body.campground);
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);    
}
module.exports.Edit = async(req, res)=>{
    const camp = await Campground.findById(req.params.id);
    if(!camp){
        req.flash('error', 'Cannot find that campground!!');
        res.redirect('/campgrounds');
    }
    res.render('edit.ejs', {camp});
}
module.exports.Delete = async(req, res)=>{
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted you campground!!');
    res.redirect(`/campgrounds`);
}
module.exports.Show = async(req, res)=>{
    // always specify what are you searching from params
    const Id = req.params.id;
    const campground = await Campground.findById(Id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    res.render('indexwithid.ejs', {campground});
}
