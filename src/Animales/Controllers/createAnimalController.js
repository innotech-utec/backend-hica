
import { Animal } from '../Models/Animal.js';

export const createAnimalController = async (request, response) => {
    const { nombre, especie, edad, responsableId } = request.body;

    // Validaciones básicas
    if (!nombre) {
        return response.status(401).json({ message: 'El nombre del animal no debe estar vacío.' });
    }

    if (!especie) {
        return response.status(401).json({ message: 'La especie del animal no debe estar vacía.' });
    }

    if (!año || isNaN(edad)) {
        return response.status(401).json({ message: 'Debe proporcionar una edad válida para el animal.' });
    }

    if (!responsableId) {
        return response.status(401).json({ message: 'Debe asociar el animal a un responsable.' });
    }

    // Crear el nuevo animal
    try {
        const animal = await Animal.create({
            nombre,
            especie,
            edad,
            responsableId
        });

        // Responder con éxito y enviar la ID del nuevo animal
        return response.status(201).json({
            id: animal.id,
            message: 'Animal creado con éxito.'
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Error al crear el animal.',
            error: error.message
        });
    }
};
