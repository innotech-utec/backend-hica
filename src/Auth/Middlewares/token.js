import { TokenService } from '../Services/TokenService.js';

export const token = (request, response, next) => {
    const authHeader = request.headers.authorization;

    // Verifica si el header contiene un token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(403).json({
            message: 'Token no proporcionado o mal formado'
        });
    }

    // Extrae el token sin el prefijo 'Bearer'
    const token = authHeader.split(' ')[1];

    // Valida el token usando el TokenService
    const decodedToken = TokenService.isValid(token);

    if (!decodedToken) {
        return response.status(403).json({
            message: 'Credenciales inválidas'
        });
    }

    // Si el token es válido, adjuntamos el token decodificado a la solicitud
    request.user = decodedToken;
    next();
};

