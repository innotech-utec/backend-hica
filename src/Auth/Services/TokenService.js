import jwt from 'jsonwebtoken';
import { env } from '../../Shared/env.js';  // Asegúrate de que JWT_SECRET_KEY esté configurada correctamente

export class TokenService {
    static isValid(token) {
        try {
            // Verifica el token con la clave secreta
            const decoded = jwt.verify(token, env('JWT_SECRET_KEY'));
            return decoded;  // Retorna el token decodificado si es válido
        } catch (error) {
            console.error('Error al verificar el token:', error);
            return null;  // Retorna null si el token no es válido o ha expirado
        }
    }
}

