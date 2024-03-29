const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./helper');
const campground = require('../models/campground');


mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected');
})
    .catch((err) => {
        console.log(err, 'This is the error');
    })
mongoose.set('strictQuery', true);

const seed = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random100 = Math.floor(Math.random() * 100);
        const random1 = Math.floor(Math.random() * descriptors.length);
        const random2 = Math.floor(Math.random() * places.length);
        const priceRand = Math.floor(Math.random() * 3000) + 1000;
        const camp = new Campground
            ({
                title: `${descriptors[random1]} ${places[random2]}`,
                location: `${cities[random100].city}, ${cities[random100].admin_name}`,
                price: `${priceRand}`,
                author: '63f702086e317929eb7f01ea',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta delectus nemo atque sed omnis doloremque ab et! Tempore consequuntur ipsum, sed quod ipsam nulla consectetur tempora, laboriosam animi fugit suscipit?',
                image: [
                    {
                      url: 'https://res.cloudinary.com/dfvp9ub8o/image/upload/v1693341470/YelpCamp/roqdqnmiuwerdlxcicqf.jpg',
                      filename: 'YelpCamp/roqdqnmiuwerdlxcicqf',
                    },
                    {
                      url: 'https://res.cloudinary.com/dfvp9ub8o/image/upload/v1693341472/YelpCamp/knu4suw6w4wx6ypf0iva.jpg',
                      filename: 'YelpCamp/knu4suw6w4wx6ypf0iva',
                    }
                  ],
            });
        await camp.save();
    }
}

seed();