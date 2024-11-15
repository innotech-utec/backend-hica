import { FichaClinica } from '../Models/FichaClinica.js';
import { Reseña } from '../Models/Reseña.js';

export const getResenaImagenController = async (request, response) => {
    try {
        console.log("Solictud recibida");
        const { fichaClinicaId } = request.params; // Asumiendo que viene como parámetro de ruta
        console.log("###################### ############################################");
        console.log(fichaClinicaId);

        // Validar que se recibió el fichaClinicaId
        if (!fichaClinicaId) {
            return response.status(400).json({ 
                message: 'No se recibió el ID de la ficha clínica' 
            });
        }

        // Buscar la reseña correspondiente
        const reseña = await Reseña.findOne({
            where: { fichaClinicaId }
        });

        // Si no existe la reseña
        if (!reseña) {
            return response.status(404).json({ 
                message: 'No se encontró reseña para esta ficha clínica' 
            });
        }

        // Retornar el link de la imagen
        return response.status(200).json({
            imagen: reseña.imagen
        });

    } catch (error) {
        console.error('Error al obtener la imagen de la reseña:', error);
        return response.status(500).json({
            message: 'Error al obtener la imagen de la reseña',
            error: error.message
        });
    }
};