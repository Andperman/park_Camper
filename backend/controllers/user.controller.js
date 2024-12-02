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
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });  
  }

  try {
  
    const userData = await getUsersByEmail(email);
    if (userData) {
      res.status(200).json(userData);  
    } else {
      res.status(404).json({ error: 'User not found' }); 
    }
  } catch (error) {
    console.error('Error obtaining user by email:', error);
    res.status(500).json({ error: 'Internal server error' });  
  }
};

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


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica que se proporcionen email y contraseña
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Busca al usuario en la base de datos por email
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compara la contraseña recibida con la almacenada (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log("User ID: ", user.id);

    // Crear el token con la información del usuario (incluyendo id)
    const token = createToken({
      email:user.email,
      id: user.id,      // el `id` del usuario en el payload
      role: user.role,  
    });

    res
      .status(200)
      .set('Authorization', `Bearer ${token}`) 
      .json({ message: 'Login successful', token }); 

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const logout = async (req, res) => {
  try {
    res.status(200)
      .clearCookie('access_token', {
        httpOnly: true,  // Asegúrate de que coincida con las opciones usadas al establecer la cookie
        secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
        sameSite: 'strict', // Mismo sitio para prevenir CSRF
      })
      .json({ msg: "User unlogged" });
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
  // Extraer el `user_id` del token 
  const user_id = req.user.id;
  const { mongo_title, mongo_id } = req.body;  // Toma el mongo_title y mongo_id del cuerpo de la solicitud

  if (!mongo_title || !mongo_id) {
    return res.status(400).json({ error: 'mongo_title and mongo_id are required' });
  }

  const newFavorite = {
    user_id,       
    mongo_title,   
    mongo_id       
  };

  try {
    const response = await User.markAsFavorite(newFavorite);
    res.status(201).json({
      items_created: response,
      message: `New Favorite created for user: ${user_id}`,
      data: newFavorite
    });
  } catch (error) {
    console.error('Error marking favorite:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



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