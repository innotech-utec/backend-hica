// ./Animales/Controllers/indexAnimalController.js
import { Animal } from '../Models/Animal.js';
import { Responsable } from '../../Responsables/Models/Responsable.js'; 

export const indexAnimalController = async (req, res) => {
  try {
    const animales = await Animal.findAll({
      include: {
        model: Responsable, // Incluye la relación con Responsable si es necesario
        as: 'responsable'
      },
      order: [['createdAt', 'DESC']] // Ordena los resultados por fecha de creación
    });

    res.status(200).json(animales);
  } catch (error) {
    console.error('Error al obtener el listado de animales:', error);
    res.status(500).json({ message: 'Error al obtener el listado de animales.' });
  }
};
