const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '618e31667782c7f1b4fe792f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/moriarty925/image/upload/v1637406014/YelpCamp/oaynzyrvfus7uvl96m5w.jpg',
                    filename: 'YelpCamp/oaynzyrvfus7uvl96m5w'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quos voluptatum, sunt fuga reprehenderit porro maxime! Facere aspernatur doloremque ipsa soluta atque voluptatibus id dolorum nihil autem ea, fugiat libero!',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});