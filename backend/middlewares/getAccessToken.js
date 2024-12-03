import express from 'express';

const getAccessToken = express.Router();

getAccessToken.use(async (req, res, next) => {
    const { cookie, authorization } = req.headers;
    console.log('Authorization Header:', authorization);  // Log para verificar el header

    if (authorization && authorization.includes('Bearer')) {
        const token = authorization.split(' ')[1];
        console.log('Authorization Header:', authorization);
        console.log('Extracted Token:', token);
        if (token) {
            req.token = token;  // Almacena el token en req.token
            return next();
        } else {
            return res.sendStatus(403);  // Forbidden si no hay token
        }
    }

    if (cookie && cookie.includes('access_token=')) {
        const cookies = cookie.split(';'); 
        const accessToken = cookies.find(c => c.trim().startsWith('access_token='));
        if (accessToken) {
            const token = accessToken.split('=')[1]; // Obtén el token de la cookie
            req.token = token;  // Almacena el token en req.token
            return next();
        } else {
            return res.sendStatus(403);  // Forbidden si no hay token
        }
    }
});




export default getAccessToken;
