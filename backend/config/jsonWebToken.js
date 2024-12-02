
import jwt from 'jsonwebtoken';

const SECRET = process.env.MY_TOKEN_SECRET; 

// Crear un token con el payload y expiración de 1 hora
const createToken = (payload) => {
  return jwt.sign(
    { 
      id: payload.id,        
      email: payload.email, 
      role: payload.role     
    },
    SECRET,
    { expiresIn: '1h' }    
  );
};
// Decodificar un token y verificar la validez 
const decodeToken = (token) => {
  try {
    
    const decoded = jwt.verify(token, SECRET);
 
    return {
      id: decoded.id,      
      email: decoded.email,
      role: decoded.role   
    };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { createToken, decodeToken };
