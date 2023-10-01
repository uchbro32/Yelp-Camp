const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
        cloud_name: 'dfvp9ub8o',
        api_key: '268455933962864',
        api_secret: 'Ryy9GiWS-LaRbIKUKu_SJVntChg'
    });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}