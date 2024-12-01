import jwt from 'jsonwebtoken';

const SECRET = process.env.MY_TOKEN_SECRET;

const createToken = (payload) => {
    return jwt.sign(payload, SECRET);
};

const decodeToken = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

// Exportación nombrada
export { createToken, decodeToken };



