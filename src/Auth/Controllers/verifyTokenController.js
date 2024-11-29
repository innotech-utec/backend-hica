import { TokenService } from '../Services/TokenService.js';
import { User } from '../../Users/Models/User.js';

export const verifyTokenController = async (request, response) => {
    const authHeader = request.headers.authorization;
    
    // Verifica si el header contiene un token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(403).json({
            message: 'Token no proporcionado o mal formado'
        });
    }

    // Extrae el token sin el prefijo 'Bearer'
    const token = authHeader.split(' ')[1];
    
    // Valida y decodifica el token usando el TokenService
    const decodedToken = TokenService.isValid(token);
    
    if (decodedToken) {
        try {
            // Buscar el usuario y verificar términos
            const user = await User.findByPk(decodedToken.userId);
            
            return response.json({
                message: "Token válido",
                data: {
                    response: true,
                    aceptoTerminos: user ? user.aceptoTerminos : false
                }
            });
        } catch (error) {
            console.error('Error al verificar términos:', error);
            return response.status(500).json({
                message: "Error al verificar términos",
                data: {
                    response: false
                }
            });
        }
    }

    return response.status(403).json({
        message: "Token inválido",
        data: {
            response: false
        }
    });
};