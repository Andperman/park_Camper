// const express = require('express');
// const router = express.Router();
// const locationController = require('../controllers/location.controller');

// // Rutas para CRUD de ubicaciones
// router.post('/locations', locationController.createLocation);
// router.get('/locations', locationController.getAllLocations);
// router.delete('/locations/:id', locationController.deleteLocation);

// module.exports = router;

import express from 'express';
import locationController from '../controllers/location.controller.js';

const router = express.Router();

router.get('/locations', locationController.getLocations);
router.get('/locations/manual', locationController.getManualLocations); //obtener las creadas solo 
router.post('/locations', locationController.createLocation);
router.delete('/locations/:id', locationController.deleteLocation);



export default router;