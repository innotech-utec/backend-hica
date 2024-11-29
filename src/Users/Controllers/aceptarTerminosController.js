// users/controllers/aceptarTerminosController.js
import { User } from "../../Users/Models/User.js";
import jwt from 'jsonwebtoken';
import { env } from '../../Shared/env.js';

export const aceptarTerminosController = async (request, response) => {
    try {
        // Obtener el token del header
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.status(403).json({
                message: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env('JWT_SECRET_KEY'));
        const userId = decoded.userId;

        if (!userId) {
            return response.status(400).json({
                message: 'ID de usuario no encontrado'
            });
        }

        // Actualizar el usuario
        await User.update({
            aceptoTerminos: true,
            fechaAceptacionTerminos: new Date()
        }, {
            where: { id: userId }
        });

        // Buscar el usuario actualizado para devolverlo en la respuesta
        const userUpdated = await User.findByPk(userId);

        return response.json({
            message: 'Términos y condiciones aceptados correctamente',
            data: {
                aceptoTerminos: userUpdated.aceptoTerminos,
                fechaAceptacionTerminos: userUpdated.fechaAceptacionTerminos
            }
        });
    } catch (error) {
        console.error('Error al aceptar términos:', error);
        return response.status(500).json({ 
            message: 'Error al actualizar términos y condiciones',
            error: error.message
        });
    }
};