const Settings = require('../models/Settings');

// @desc    Get website settings (creates default if not exists)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = await Settings.create({});
    }

    res.json(settings);
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = new Settings();
    }

    const {
        siteName,
        logo,
        contactEmail,
        contactPhone,
        currency,
        socialLinks,
        bannerImage,
        aboutContent,
    } = req.body;

    settings.siteName = siteName || settings.siteName;
    settings.logo = logo || settings.logo;
    settings.contactEmail = contactEmail || settings.contactEmail;
    settings.contactPhone = contactPhone || settings.contactPhone;
    settings.currency = currency || settings.currency;
    settings.socialLinks = socialLinks || settings.socialLinks;
    settings.bannerImage = bannerImage || settings.bannerImage;
    settings.aboutContent = aboutContent || settings.aboutContent;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
};

module.exports = { getSettings, updateSettings };
