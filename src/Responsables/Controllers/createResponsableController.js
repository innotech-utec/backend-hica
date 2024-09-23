import { Responsable } from '../Models/Responsable.js';

export const createResponsableController = async (request, response) => {
    const { documento, nombre, apellido, estado, domicilio } = request.body;

    // Validaciones
    if (!documento) {
        return response.status(401).json({ message: 'El documento no puede estar vacío.' });
    }

    if (!nombre) {
        return response.status(401).json({ message: 'El campo nombre no debe estar vacío.' });
    }

    if (!apellido) {
        return response.status(401).json({ message: 'El campo apellido no debe estar vacío.' });
    }

    if (!domicilio) {
        return response.status(401).json({ message: 'El campo domicilio no debe estar vacío.' });
    }

    // Crear nuevo responsable
    try {
        const responsable = await Responsable.create({
            documento,
            nombre,
            apellido,
            estado: estado ?? true,  
            domicilio
        });

        // Enviar la ID en la respuesta
        return response.status(201).json({
            id: responsable.id,
            message: 'Responsable creado con éxito.'
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Error al crear el responsable.',
            error: error.message
        });
    }
};
