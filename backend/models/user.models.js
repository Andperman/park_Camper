import { pool } from '../config/db_pgSQL.js';
import { queries } from '../utils/queries.js';
import bcrypt from 'bcryptjs';
//falta favoritos


// GET
export const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// GET BY EMAIL CONTROLLER PARAMS
export const getUserByEmail = async (email) => {
    let client;
    try {
      client = await pool.connect();
      const result = await client.query(queries.getUsersByEmail, [email]);
  
      if (result.rows.length > 0) {
        return result.rows[0]; 
      } else {
        return null; 
      }
    } catch (err) {
      console.error('Error in getUserByEmail:', err);
      throw err; 
    } finally {
      client.release(); 
    }
  };

// POST (CREATE)
export const createUser = async (user) => {
    const { username, email, password} = user;
    let client, result;
    // Si el username es null o undefined, asigna uno por defecto
    const finalUsername = username ? username : email.split('@')[0]; 
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.createUser,[finalUsername, email, hashedPassword])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

export const deleteUserByEmail = async (userToDelete) => {
    const email = userToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
        result = data.rowCount
        
    } catch (err) {
        console.log('Error deleting user:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET BY EMAIL CONTROLLER PARAMS
const getAllFavoritesFromUser = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllFavoritesFromUser, [id])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const markAsFavorite = async (favorite) => {
    const { user_id, mongo_title, mongo_id } = favorite;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.markAsFavorite,[user_id, mongo_title, mongo_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const unmarkAsFavorite = async (favoriteid) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.unmarkAsFavorite, [favoriteid]);
        result = data.rowCount
        
    } catch (err) {
        console.log('Error unmarking favorite:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};



const Users = {
    getAllUsers,
    getUserByEmail,
    createUser,
    deleteUserByEmail,
    getAllFavoritesFromUser,
    markAsFavorite,
    unmarkAsFavorite
}


export default Users;
