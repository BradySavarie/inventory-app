const express = require('express');
const router = express.Router();

// require controller modules here //
const effect_controller = require('../controllers/effectController');
const effectInstance_controller = require('../controllers/effectInstanceController');

// EFFECT ROUTES //

// Get catalog home page
router.get('/', effect_controller.index);

// get request for creating an effect
router.get('/effect/create', effect_controller.effect_create_get);

// post request for creating an effect
router.post('/effect/create', effect_controller.effect_create_post);

// get request to delete an effect
router.get('/effect/:id/delete', effect_controller.effect_delete_get);

// post request to delete an effect
router.post('/effect/:id/delete', effect_controller.effect_delete_post);

// get request to update an effect
router.get('/effect/:id/update', effect_controller.effect_update_get);

// post request to update an effect
router.post('/effect/:id/update', effect_controller.effect_update_post);

// get request for one effect
router.get('/effect/:id', effect_controller.effect_detail);

// get request for a list of all effects
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
