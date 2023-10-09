// require asyncHandler and models as needed
const asyncHandler = require('express-async-handler');
const Effect = require('../models/effect');
const EffectInstance = require('../models/effectInstance');
const Manufacturer = require('../models/manufacturer');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

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
    const [allManufacturers, allCategories] = await Promise.all([
        Manufacturer.find().exec(),
        Category.find().exec(),
    ]);

    res.render('effect_form', {
        title: 'Create Effect',
        manufacturers: allManufacturers,
        categories: allCategories,
    });
});

exports.effect_create_post = [
    // Validate and sanitize fields.
    body('model', 'Model must be greater than 1 character')
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body('manufacturer', 'Manufacturer must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category', 'Category must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('price').isNumeric().escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Effect object with escaped and trimmed data.
        const effect = new Effect({
            model: req.body.model,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all manufacturers and categories for form.
            const [allManufacturers, allCategories, effectCategory] =
                await Promise.all([
                    Manufacturer.find().exec(),
                    Category.find().exec(),
                    Category.findById(effect.category),
                ]);

            // Mark our selected categories as checked.
            for (const category of allCategories) {
                if (effectCategory.name === category.name) {
                    category.checked = 'true';
                }
            }

            console.log(allManufacturers);
            res.render('effect_form', {
                title: 'Create Effect',
                manufacturers: allManufacturers,
                categories: allCategories,
                effect: effect,
                errors: errors.array(),
            });
        } else {
            // Data from form is valid. Save book.
            await effect.save();
            res.redirect(effect.url);
        }
    }),
];

exports.effect_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of book and all the book instances (in parallel)
    const [effect, allInstancesOfEffect] = await Promise.all([
        Effect.findById(req.params.id).populate('manufacturer').exec(),
        EffectInstance.find({ effect: req.params.id })
            .populate('effect')
            .exec(),
    ]);

    if (effect === null) {
        // No results.
        res.redirect('/catalog/effects');
    }

    res.render('effect_delete', {
        title: 'Delete Effect',
        effect: effect,
        effect_instances: allInstancesOfEffect,
    });
});

exports.effect_delete_post = asyncHandler(async (req, res, next) => {
    const [effect, allInstancesOfEffect] = await Promise.all([
        Effect.findById(req.params.id).populate('manufacturer').exec(),
        EffectInstance.find({ effect: req.params.id })
            .populate('effect')
            .exec(),
    ]);

    if (allInstancesOfEffect.length > 0) {
        res.render('effect_delete', {
            title: 'Delete Effect',
            effect: effect,
            effect_instances: allInstancesOfEffect,
        });
        return;
    } else {
        await Effect.findByIdAndRemove(req.body.effectid);
        res.redirect('/catalog/effects');
    }
});

exports.effect_update_get = asyncHandler(async (req, res, next) => {
    // Get book, authors and genres for form.
    const [effect, allManufacturers, allCategories] = await Promise.all([
        Effect.findById(req.params.id)
            .populate('manufacturer')
            .populate('category')
            .exec(),
        Manufacturer.find().exec(),
        Category.find().exec(),
    ]);

    if (effect === null) {
        // No results.
        const err = new Error('Effect not found');
        err.status = 404;
        return next(err);
    }

    // Mark our selected categories as checked.
    for (const category of allCategories) {
        if (effect.category.name === category.name) {
            category.checked = 'true';
        }
    }

    res.render('effect_form', {
        title: 'Update Effect',
        manufacturers: allManufacturers,
        categories: allCategories,
        effect: effect,
    });
});

exports.effect_update_post = asyncHandler(async (req, res, next) => {
    res.send('Effect update post not yet implemented');
});

exports.effect_detail = asyncHandler(async (req, res, next) => {
    const [effect, effectInstances] = await Promise.all([
        Effect.findById(req.params.id)
            .populate('manufacturer')
            .populate('category')
            .exec(),
        EffectInstance.find({ effect: req.params.id }).exec(),
    ]);

    if (effect === null) {
        const err = new Error('Effect not found');
        err.status = 404;
        return next(err);
    }

    res.render('effect_detail', {
        title: effect.title,
        effect: effect,
        effect_instances: effectInstances,
    });
});

exports.effect_list = asyncHandler(async (req, res, next) => {
    const allEffects = await Effect.find({}, 'model manufacturer')
        .sort({ title: 1 })
        .populate('manufacturer')
        .exec();

    console.log(allEffects);

    res.render('effect_list', {
        title: 'Effect List',
        effect_list: allEffects,
    });
});
