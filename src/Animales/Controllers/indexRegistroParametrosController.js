import { RegistroParametros } from '../Models/RegistroParametros.js';
import { Animal } from '../Models/Animal.js';

export const indexRegistroParametrosController = async (req, res) => {
  try {
    const { animalId } = req.params;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    const parametros = await RegistroParametros.findAll({ where: { animalId }, include: { model: Animal, as: 'animal' } });
    res.status(200).json(parametros);
  } catch (error) {
    console.error('Error al obtener los registros de parámetros:', error);
    res.status(500).json({ message: 'Error al obtener los registros de parámetros.' });
  }
};
