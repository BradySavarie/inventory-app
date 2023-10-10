const Manufacturer = require('../models/manufacturer');
const Effect = require('../models/effect');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
    res.render('manufacturer_form', { title: 'Create Manufacturer' });
});

exports.manufacturer_create_post = [
    body('name', 'Name must be specified').trim().isLength({ min: 1 }).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const manufacturer = new Manufacturer({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render('manufacturer_form', {
                title: 'Create Manufacturer',
                manufacturer: manufacturer,
                errors: errors.array(),
            });
            return;
        } else {
            await manufacturer.save();
            res.redirect(manufacturer.url);
        }
    }),
];

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
    const [manufacturer, allEffectsByManufacturer] = await Promise.all([
        Manufacturer.findById(req.params.id).exec(),
        Effect.find({ manufacturer: req.params.id }, 'model'),
    ]);

    if (manufacturer === null) {
        // No results.
        res.redirect('/catalog/manufacturers');
    }

    res.render('manufacturer_delete', {
        title: 'Delete Manufacturer',
        manufacturer: manufacturer,
        manufacturer_effects: allEffectsByManufacturer,
    });
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [manufacturer, allEffectsByManufacturer] = await Promise.all([
        Manufacturer.findById(req.params.id).exec(),
        Effect.find(
            { manufacturer: req.params.id },
            'model description'
        ).exec(),
    ]);

    if (allEffectsByManufacturer.length > 0) {
        res.render('manufacturer_delete', {
            title: 'Delete Manufacturer',
            manufacturer: manufacturer,
            manufacturer_effects: allEffectsByManufacturer,
        });
        return;
    } else {
        await Manufacturer.findByIdAndRemove(req.body.manufacturerid);
        res.redirect('/catalog/manufacturers');
    }
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
