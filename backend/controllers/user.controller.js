import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';  
import { createToken} from '../config/jsonWebToken.js';


//OBTENER TODOS LOS USUARIOS
export const getAllUsers = async (req, res) => {
    let users;
    users = await User.getAllUsers();

    res.status(200).json(users); 
}

//OBTENER USUARIOS POR EMAIL 
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

// CREAR USUARIOS (POST) (BODY: USERNAME/EMAIL/PASSWORD) REGISTER
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

//BORRAR USUARIO POR EMAIL
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

//LOGIN USUARIO  (/login)
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }
//     const user = await User.getUserByEmail(email); 

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     // Compara la contraseña recibida con la almacenada (hashed)
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     res.status(200).json({ message: 'Login successful', data: user });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


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

    // Compara la contraseña recibida con la almacenada (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Crear el token
    const token = createToken({ email: user.email, id: user.id });

    // Configurar la respuesta con el token
    res
      .status(200)
      .set('Authorization', `Bearer ${token}`) // Añadir el token en la cabecera
      .json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
      res.status(200)
          .set('Authorization', "")
          .cookie('access_token', "")
          .json({ msg: "User unlogged" })
  } catch (error) {
      res.status(400).json({ msg: error.message });

  }
};

//LOGICA FAVORITOS
const getAllFavoritesFromUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
      const userData = await User.getAllFavoritesFromUser(id);
      if (userData) {
          res.status(200).json(userData);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error obtaining favorites by email:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}
const markAsFavorite = async (req, res) => {
  //mongo_id y mongo_title van a venir de un fetch, user_id viene del login(?)
  const newFavorite = req.body; // {user_id,mongo_title,mongo_id}
  const response = await User.markAsFavorite(newFavorite);
  res.status(201).json({
      "items_created": response,
      message: `New Favorite created for user: ${req.body.user_id}`,
      data: newFavorite
  });
}
const unmarkAsFavorite = async (req, res) => {
  const favorite_id = req.params.favorite_id; // {email} le pasaremos el email por el body
  try {
      const response = await User.unmarkAsFavorite(favorite_id);
      if (response) {
          res.status(200).json({
              message: `favorite was deleted successfully`,
              data: response
          });
      } else {
          res.status(404).json({ error: 'favorite was not found' });
      }
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

export default {   
    getAllUsers,
    getUsersByEmail,
    createUser,
    deleteUserByEmail,
    loginUser,
    logout,
    getAllFavoritesFromUser,
    markAsFavorite,
    unmarkAsFavorite

};