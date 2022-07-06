const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
    },
    redirectUrl: {
        type: String,
    },
    uid: {
        type: String,
        unique: [true, 'This url already exists'],
    },
    label: {
        type: String,
    },
    visitCount: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: String,
    }
})

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;