const express = require('express');
const router = express.Router();

// require controller modules here //
const effect_controller = require('../controllers/effectController');
const effectInstance_controller = require('../controllers/effectInstanceController');

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

module.exports = router;
