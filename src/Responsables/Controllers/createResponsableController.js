
import { Responsable } from '../Models/Responsable.js';


export const createResponsableController = async (request, response) => {
    const { documento, nombre, apellido, domicilio, telefono,departamentoId, localidadId } = request.body;

    try {
        
        if (!documento || !nombre || !apellido || !domicilio || !telefono ||  !departamentoId || !localidadId) {
            return response.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

       
        const responsable = await Responsable.create({
            documento,
            nombre,
            apellido,
            domicilio,
            telefono,
            departamentoId,
            localidadId,
        });

        return response.status(201).json({
            id: responsable.id,
            message: 'Responsable creado con éxito.',
        });
    } catch (error) {
        console.error('Error al crear el responsable:', error);
        return response.status(500).json({ message: 'Error al crear el responsable.', error: error.message });
    }
};
