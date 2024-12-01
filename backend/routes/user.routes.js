// routes/user.routes.js
import express from 'express';
import userController from '../controllers/user.controller.js';  
const router = express.Router();

//USER
router.get('/', userController.getAllUsers);
router.get('/email', userController.getUsersByEmail);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/email', userController.deleteUserByEmail);

// Ruta para obtener todos los favoritos de un usuario
router.get("/user/:id", userController.getAllFavoritesFromUser);

// Ruta para marcar como favorito
router.post("/", userController.markAsFavorite);

// Ruta para eliminar un favorito
router.delete("/:favorite_id", userController.unmarkAsFavorite);

// //FAVORITES NUEVO
// router.get("/favorites/:id", userController.getAllFavoritesFromUser);
// router.post("/favorites", userController.markAsFavorite);
// router.delete("/:favorite_id", userController.unmarkAsFavorite);


export default router;
