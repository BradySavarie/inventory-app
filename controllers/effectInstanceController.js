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

exports.effectInstance_create_post = asyncHandler(async (req, res, next) => {
    res.send('Effect instance create post not yet implemented');
});

exports.effectInstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Effect instance delete get not yet implemented');
});

exports.effectInstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Effect instance delete post not yet implemented');
});

exports.effectInstance_update_get = asyncHandler(async (req, res, next) => {
    res.send('Effect instance update get not yet implemented');
});

exports.effectInstance_update_post = asyncHandler(async (req, res, next) => {
    res.send('Effect instance update post not yet implemented');
});

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
