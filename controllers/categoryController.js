const Category = require('../models/category');
const Effect = require('../models/effect');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render('category_form', { title: 'Create Category' });
});

exports.category_create_post = [
    // Validate and sanitize the name field.
    body('name', 'Category name must contain at least 1 character')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        const category = new Category({ name: req.body.name });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('category_form', {
                title: 'Create Category',
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const categoryExists = await Category.findOne({
                name: req.body.name,
            })
                .collation({ locale: 'en', strength: 2 })
                .exec();
            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();

                res.redirect(category.url);
            }
        }
    }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of genre and all the books (in parallel)
    const [category, allEffectsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Effect.find({ category: req.params.id }, 'model description').exec(),
    ]);

    if (category === null) {
        res.redirect('/catalog/categories');
    }

    res.render('category_delete', {
        title: 'Delete Category',
        category: category,
        category_effects: allEffectsInCategory,
    });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [category, allEffectsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Effect.find({ genre: req.params.id }, 'model description').exec(),
    ]);

    if (allEffectsInCategory.length > 0) {
        res.render('category_delete', {
            title: 'Delete Category',
            category: category,
            category_effects: allEffectsInCategory,
        });
        return;
    } else {
        // Author has no books. Delete object and redirect to the list of authors.
        await Category.findByIdAndRemove(req.body.categoryid);
        res.redirect('/catalog/categories');
    }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    res.render('category_form', {
        title: 'Update Category',
        category: category,
    });
});

exports.category_update_post = [
    body('name', 'Name must be specified').trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render('category_form', {
                title: 'Update Category',
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                category,
                {}
            ).exec();
            res.redirect(category.url);
        }
    }),
];

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
