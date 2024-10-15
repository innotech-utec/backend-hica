import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';
import { Animal } from '../Models/Animal.js';

export const indexExamenObjetivoController = async (req, res) => {
  try {
    const { animalId } = req.params;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    const examenes = await ExamenObjetivo.findAll({ where: { animalId }, include: { model: Animal, as: 'animal' } });
    res.status(200).json(examenes);
  } catch (error) {
    console.error('Error al obtener los exámenes objetivos:', error);
    res.status(500).json({ message: 'Error al obtener los exámenes objetivos.' });
  }
};
