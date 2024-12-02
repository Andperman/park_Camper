
import express from 'express';
import userController from '../controllers/user.controller.js';
import getAccessToken from '../middlewares/getAccessToken.js';
import decodeToken from '../middlewares/decodeToken.js';

const router = express.Router();

// Rutas accesibles para todos (registro y login)
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logout);

// Rutas accesibles solo para usuarios autenticados (requiere login)
router.get('/email',userController.getUsersByEmail); 
router.delete('/email', getAccessToken, userController.deleteUserByEmail); 


// Ruta para obtener todos los favoritos de un usuario
router.get('/user/:id', getAccessToken,decodeToken, userController.getAllFavoritesFromUser);  // Solo user

// Ruta para marcar como favorito
router.post('/', getAccessToken,decodeToken, userController.markAsFavorite);  // Solo user

// Ruta para eliminar un favorito
router.delete('/:favorite_id', getAccessToken,decodeToken,userController.unmarkAsFavorite);  // Solo user

export default router;
