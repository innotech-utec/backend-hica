import { Veterinario } from '../Models/Veterinarios.js';

export const indexVeterinarioController = async (request, response) => {
    const page = parseInt(request.query.page) || 1;

    try {
        
        const result = await Veterinario.paginate(4, page);

        response.json(result);
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ message: 'Error al obtener veterinarios' });
    }
};
