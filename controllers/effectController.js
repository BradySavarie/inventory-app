// require asyncHandler and models as needed
const asyncHandler = require('express-async-handler');
const Effect = require('../models/effect');
const EffectInstance = require('../models/effectInstance');
const Manufacturer = require('../models/manufacturer');
const Category = require('../models/category');

exports.index = asyncHandler(async (req, res, next) => {
    const [numEffects, numEffectInstances, numManufacturers, numCategories] =
        await Promise.all([
            Effect.countDocuments({}).exec(),
            EffectInstance.countDocuments({}).exec(),
            Manufacturer.countDocuments({}).exec(),
            Category.countDocuments({}).exec(),
        ]);

    res.render('index', {
        title: 'Audio Effects Home',
        effect_count: numEffects,
        effect_instance_count: numEffectInstances,
        manufacturer_count: numManufacturers,
        category_count: numCategories,
    });
});

exports.effect_create_get = asyncHandler(async (req, res, next) => {
    res.send('Effect create get not yet implemented');
});

exports.effect_create_post = asyncHandler(async (req, res, next) => {
    res.send('Effect create post not yet implemented');
});

exports.effect_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Effect delete get not yet implemented');
});

exports.effect_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Effect delete post not yet implemented');
});

exports.effect_update_get = asyncHandler(async (req, res, next) => {
    res.send('Effect update get not yet implemented');
});

exports.effect_update_post = asyncHandler(async (req, res, next) => {
    res.send('Effect update post not yet implemented');
});

exports.effect_detail = asyncHandler(async (req, res, next) => {
    res.send('Effect detail not yet implemented');
});

exports.effect_list = asyncHandler(async (req, res, next) => {
    res.send('Effect list not yet implemented');
});
