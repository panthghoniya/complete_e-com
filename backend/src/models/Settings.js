const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    siteName: { type: String, default: 'My E-Commerce' },
    logo: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    currency: { type: String, default: 'USD' },
    socialLinks: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
    },
    bannerImage: { type: String },
    aboutContent: { type: String },
}, {
    timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
