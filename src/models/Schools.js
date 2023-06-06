const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SchoolsSchema = new Schema({
    name_en: {
        type: String,
        required: false
    },
    name_ar: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    personal_images: {
        type: Array,
        required: false
    },
    studio_images: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Schools = mongoose.model('Schools', SchoolsSchema);