const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const campgroundRoutes = require('./routes/campgroundRoutes');
const reviewRoutes = require('./routes/reviewRouter');
const flash = require('connect-flash');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const ErrorClass = require('./utilities/errorClass');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Connected here');
})
.catch((err)=>{
    console.log(err, 'This is the error');
})

const secretive = {
    secret: 'Thisisasecretsodonttellanyone',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000*60*60*24,
        maxAge: 1000*60*60*24,
        httpOnly: true
    }
}

app.use(session(secretive));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/review', reviewRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.all('*', (req,res,next)=>{
    next(new ErrorClass('Page Not Found', 404));
})



app.use((err,req,res,next)=>{
    // const { status = 500, message = 'Something Went wrong!!!'} = err;
    res.render('error.ejs', { err });
})

app.listen(3000, ()=>{
    console.log('Listing on port 3000!!!');
})