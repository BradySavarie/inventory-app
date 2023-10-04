const express = require('express');
const router = express.Router();

// require controller modules here //
const effect_controller = require('../controllers/effectController');

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

module.exports = router;
