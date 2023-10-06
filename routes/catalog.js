const express = require('express');
const router = express.Router();

// require controller modules here //
const effect_controller = require('../controllers/effectController');
const effectInstance_controller = require('../controllers/effectInstanceController');
const manufacturer_controller = require('../controllers/manufacturerController');

// EFFECT ROUTES //

router.get('/', effect_controller.index);

router.get('/effect/create', effect_controller.effect_create_get);

router.post('/effect/create', effect_controller.effect_create_post);

router.get('/effect/:id/delete', effect_controller.effect_delete_get);

router.post('/effect/:id/delete', effect_controller.effect_delete_post);

router.get('/effect/:id/update', effect_controller.effect_update_get);

router.post('/effect/:id/update', effect_controller.effect_update_post);

router.get('/effect/:id', effect_controller.effect_detail);

router.get('/effects', effect_controller.effect_list);

// EFFECT INSTANCE ROUTES //

router.get(
    '/effectInstance/create',
    effectInstance_controller.effectInstance_create_get
);

router.post(
    '/effectInstance/create',
    effectInstance_controller.effectInstance_create_post
);

router.get(
    '/effectInstance/:id/delete',
    effectInstance_controller.effectInstance_delete_get
);

router.post(
    '/effectInstance/:id/delete',
    effectInstance_controller.effectInstance_delete_post
);

router.get(
    '/effectInstance/:id/update',
    effectInstance_controller.effectInstance_update_get
);

router.post(
    '/effectInstance/:id/update',
    effectInstance_controller.effectInstance_update_post
);

router.get(
    '/effectInstance/:id',
    effectInstance_controller.effectInstance_detail
);

router.get('/effectInstances', effectInstance_controller.effectInstance_list);

// MANUFACTURER ROUTES //

router.get(
    '/manufacturer/create',
    manufacturer_controller.manufacturer_create_get
);

router.post(
    '/manufacturer/create',
    manufacturer_controller.manufacturer_create_post
);

router.get(
    '/manufacturer/delete',
    manufacturer_controller.manufacturer_delete_get
);

router.post(
    '/manufacturer/delete',
    manufacturer_controller.manufacturer_delete_post
);

router.get(
    '/manufacturer/update',
    manufacturer_controller.manufacturer_update_get
);

router.post(
    '/manufacturer/update',
    manufacturer_controller.manufacturer_update_post
);

router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

router.get('/manufacturers', manufacturer_controller.manufacturer_list);

module.exports = router;
