import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';  


// const { validationResult } = require("express-validator");

// GET http://localhost:3000/users --> ALL
// GET http://localhost:3000/users?email=hola@gmail.com --> query por email
//todos usuarios
export const getAllUsers = async (req, res) => {
    let users;
    users = await User.getAllUsers();

    res.status(200).json(users); // 
}

//usuarios por email 
export const getUsersByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const userData = await User.getUsersByEmail(email);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error obtaining user by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Crear usuario //Post
export const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const newUser = await User.createUser({ username, email, password });
  
      res.status(201).json({
        message: `User created: ${email}`,
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//borrar usuario
export const deleteUserByEmail = async (req, res) => {
    const { email } = req.body;  
    console.log('Email received for deletion:', email);

    try {
        const response = await User.deleteUserByEmail(email);
        if (response === 0) {
            return res.status(404).json({ error: 'User with that email was not found' });
        }
        res.status(200).json({
            message: `User: ${email} was deleted successfully`,
            data: response
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.getUserByEmail(email); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Comparar la contraseña recibida con la almacenada (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Si las credenciales son válidas, devuelve un mensaje o el usuario
    res.status(200).json({ message: 'Login successful', data: user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default {   
    getAllUsers,
    getUsersByEmail,
    createUser,
    deleteUserByEmail,
    loginUser

};