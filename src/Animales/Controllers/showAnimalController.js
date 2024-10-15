// Archivo: src/Animales/Controllers/showAnimalController.js
import { Animal } from '../Models/Animal.js';

export const showAnimalController = async (req, res) => {
  const { id } = req.params;

  try {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado.' });
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error('Error al obtener el animal:', error);
    res.status(500).json({ message: 'Error al obtener el animal.' });
  }
};
