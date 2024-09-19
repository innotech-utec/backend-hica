import { TokenService } from '../Services/TokenService.js';

export const verifyTokenController = (request, response) => {
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
    if (TokenService.isValid(token)) {
        return response.json({
            message: "Token válido",
            data: {
                response: true
            }
        });
    }

    return response.status(403).json({
        message: "Token inválido",
        data: {
            response: false
        }
    });
};

