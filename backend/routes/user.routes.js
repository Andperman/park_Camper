// routes/user.routes.js
import express from 'express';
import userController from '../controllers/user.controller.js';  
const router = express.Router();


router.get('/', userController.getAllUsers);
router.get('/email', userController.getUsersByEmail);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/email', userController.deleteUserByEmail);

export default router;
