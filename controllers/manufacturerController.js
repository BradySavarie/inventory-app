const Manufacturer = require('../models/manufacturer');
const Effect = require('../models/effect');
const asyncHandler = require('express-async-handler');

exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer create get not yet implemented');
});

exports.manufacturer_create_post = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer create post not yet implemented');
});

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer delete get not yet implemented');
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer delete post not yet implemented');
});

exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer update get not yet implemented');
});

exports.manufacturer_update_post = asyncHandler(async (req, res, next) => {
    res.send('Manufacturer update post not yet implemented');
});

exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
    const [manufacturer, allEffectsByManufacturer] = await Promise.all([
        Manufacturer.findById(req.params.id).exec(),
        Effect.find(
            { manufacturer: req.params.id },
            'model description'
        ).exec(),
    ]);

    if (manufacturer === null) {
        const err = new Error('Manufacturer not found');
        err.status = 404;
        return next(err);
    }

    res.render('manufacturer_detail', {
        title: 'Manufacturer Detail',
        manufacturer: manufacturer,
        manufacturer_effects: allEffectsByManufacturer,
    });
});

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
    const allManufacturers = await Manufacturer.find({})
        .sort({ name: 1 })
        .exec();

    res.render('manufacturer_list', {
        title: 'Manufacturer List',
        manufacturers_list: allManufacturers,
    });
});
