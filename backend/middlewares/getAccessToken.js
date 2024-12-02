import express from 'express';

const getAccessToken = express.Router();

getAccessToken.use(async (req, res, next) => {
    const { cookie, authorization } = req.headers;

    // Verifica si hay un token en las cabeceras de autorización
    if (authorization && authorization.includes('Bearer')) {
        const token = authorization.split(' ')[1];
        if (token) {
            req.token = token;  // Almacena el token en req.token
            return next();
        } else {
            return res.sendStatus(403);  // Forbidden si no hay token
        }
    }

    // Verifica si hay un token en las cookies
    if (cookie && cookie.includes('access_token=')) {
        const cookies = cookie.split(',');
        const accessToken = cookies[0];
        const token = accessToken.split('=')[1];
        if (token) {
            req.token = token;  // Almacena el token en req.token
            return next();
        } else {
            return res.sendStatus(403);  // Forbidden si no hay token
        }
    }

    return res.sendStatus(403);  // Si no se encuentra el token, retorna Forbidden
});

export default getAccessToken;
