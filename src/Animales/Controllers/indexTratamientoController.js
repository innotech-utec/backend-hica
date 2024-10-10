import { Tratamiento } from '../Models/Tratamiento.js';
import { Animal } from '../Models/Animal.js';
import { User } from '../../Users/Models/User.js'; // Importar el modelo de usuario que representa a los veterinarios

export const indexTratamientoController = async (req, res) => {
  try {
    const { animalId } = req.params;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    // Consultar los tratamientos asociados al animal
    const tratamientos = await Tratamiento.findAll({
      where: { animalId },
      include: [
        { model: Animal, as: 'animal' },
        { model: User, as: 'veterinario' } // Incluir el modelo de veterinario (usuario)
      ],
      attributes: ['id', 'fecha', 'hora', 'medicacion', 'observaciones', 'estadoAutorizacion', 'fichaClinicaId', 'veterinarioId', 'createdAt'],
      order: [['createdAt', 'DESC']] // Ordenar los resultados por la fecha de creación
    });

    res.status(200).json(tratamientos);
  } catch (error) {
    console.error('Error al obtener los tratamientos:', error);
    res.status(500).json({ message: 'Error al obtener los tratamientos.' });
  }
};
