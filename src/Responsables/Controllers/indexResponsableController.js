import { Responsable } from '../Models/Responsable.js';
import { Animal } from '../../Animales/Models/Animal.js';

export const indexResponsableController = async (request, response) => {
    const page = parseInt(request.query.page) || 1;

    // Aquí puedes usar la relación sin declararla nuevamente
    const responsables = await Responsable.findAll({
        limit: 4,
        offset: (page - 1) * 4,
        include: [
            {
                model: Animal,
                as: 'animales'  // Este alias viene de la relación definida en setupRelationships.js
            }
        ]
    });

    response.json(responsables);
};
