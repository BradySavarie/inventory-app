const Category = require('../models/category');
const Effect = require('../models/effect');
const asyncHandler = require('express-async-handler');

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send('Category create get not yet implemented');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send('Category create post not yet implemented');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Category delete get not yet implemented');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Category delete post not yet implemented');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send('Category update get not yet implemented');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send('Category update post not yet implemented');
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, allEffectsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Effect.find({ category: req.params.id }).exec(),
    ]);

    if (category === null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
    }

    res.render('category_detail', {
        title: 'Category Detail',
        category: category,
        category_effects: allEffectsInCategory,
    });
});

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec();

    res.render('category_list', {
        title: 'Category List',
        category_list: allCategories,
    });
});
