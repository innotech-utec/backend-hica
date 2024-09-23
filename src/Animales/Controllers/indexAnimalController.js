import { Animal } from '../Models/Animal.js';

export const indexAnimalController = async (request, response) => {
    const page = parseInt(request.query.page) || 1;

    const animales = await Animal.findAll({
        limit: 4,
        offset: (page - 1) * 4,
        include: [
            {
                model: Responsable,
                as: 'responsable'  
            }
        ]
    });

    response.json(animales);
};
