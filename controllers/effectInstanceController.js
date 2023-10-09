const Effect = require('../models/effect');
const EffectInstance = require('../models/effectInstance');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.effectInstance_create_get = asyncHandler(async (req, res, next) => {
    const allEffects = await Effect.find({}, 'model').exec();

    res.render('effectInstance_form', {
        title: 'Create EffectInstance',
        effect_list: allEffects,
    });
});

exports.effectInstance_create_post = [
    // Validate and sanitize fields.
    body('effect', 'Effect must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('condition').escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        const effectInstance = new EffectInstance({
            effect: req.body.effect,
            condition: req.body.condition,
        });

        if (!errors.isEmpty()) {
            // There are errors.
            // Render form again with sanitized values and error messages.
            const allEffects = await Effect.find({}, 'model').exec();

            res.render('effectInstance_form', {
                title: 'Create Effect Instance',
                effect_list: allEffects,
                selected_effect: effectInstance.effect._id,
                errors: errors.array(),
                effectinstance: effectInstance,
            });
            return;
        } else {
            // Data from form is valid
            await effectInstance.save();
            res.redirect(effectInstance.url);
        }
    }),
];

exports.effectInstance_delete_get = asyncHandler(async (req, res, next) => {
    const effectInstance = await EffectInstance.findOne({ _id: req.params.id })
        .populate({
            path: 'effect',
            populate: {
                path: 'manufacturer',
                model: 'Manufacturer',
            },
        })
        .exec();

    if (effectInstance === null) {
        res.redirect('/catalog/effectInstances');
    }

    res.render('effectInstance_delete', {
        title: 'Delete Effect Instance',
        effectinstance: effectInstance,
    });
});

exports.effectInstance_delete_post = asyncHandler(async (req, res, next) => {
    await EffectInstance.findByIdAndRemove(req.params.id).exec();
    res.redirect('/catalog/effectInstances');
});

exports.effectInstance_update_get = asyncHandler(async (req, res, next) => {
    // Get book, authors and genres for form.
    const effectInstance = await EffectInstance.findById(req.params.id)
        .populate('effect')
        .exec();
    const allEffects = await Effect.find({}, 'model').exec();

    if (effectInstance === null) {
        // No results.
        const err = new Error('Effect instance not found');
        err.status = 404;
        return next(err);
    }

    res.render('effectInstance_form', {
        title: 'Update Effect Instance',
        selected_effect: effectInstance.effect._id,
        effectinstance: effectInstance,
        effect_list: allEffects,
    });
});

exports.effectInstance_update_post = [
    body('effect', 'Effect must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('condition').escape(),

    asyncHandler(async (req, res, next) => {
        const allEffects = await Effect.find({}, 'model').exec();
        const errors = validationResult(req);

        const effectInstance = new EffectInstance({
            effect: req.body.effect,
            condition: req.body.condition,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render('effectInstance_form', {
                title: 'Update Effect Instance',
                selected_effect: effectInstance.effect._id,
                effectinstance: effectInstance,
                effect_list: allEffects,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedEffectInstance =
                await EffectInstance.findByIdAndUpdate(
                    req.params.id,
                    effectInstance,
                    {}
                ).exec();
            res.redirect(updatedEffectInstance.url);
        }
    }),
];

exports.effectInstance_detail = asyncHandler(async (req, res, next) => {
    const effectInstance = await EffectInstance.findById(req.params.id)
        .populate('effect')
        .exec();

    if (effectInstance === null) {
        // No results.
        const err = new Error('Effect instance not found');
        err.status = 404;
        return next(err);
    }

    res.render('effectInstance_detail', {
        title: 'Effect:',
        effectinstance: effectInstance,
    });
});

exports.effectInstance_list = asyncHandler(async (req, res, next) => {
    const AllEffectInstances = await EffectInstance.find()
        .populate({
            path: 'effect',
            populate: {
                path: 'manufacturer',
                model: 'Manufacturer',
            },
        })
        .exec();

    res.render('effectInstance_list', {
        title: 'Effect Instance List',
        effectinstance_list: AllEffectInstances,
    });
});
