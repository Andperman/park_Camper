import express from 'express';
import locationController from '../controllers/location.controller.js';
import getAccessToken from '../middlewares/getAccessToken.js';
import decodeToken from '../middlewares/decodeToken.js';

const router = express.Router();

// Rutas accesibles tanto para admin como para user
router.get('/locations', getAccessToken, decodeToken, locationController.getLocations);  // Acceso permitido para admin y user
router.get('/locations/manual', getAccessToken, decodeToken, locationController.getManualLocations); // Acceso permitido para admin y user

// Rutas accesibles solo para admin
router.post('/locations', getAccessToken, decodeToken, locationController.createLocation); // Solo admin
router.delete('/locations/:id', getAccessToken, decodeToken, locationController.deleteLocation); // Solo admin

export default router;