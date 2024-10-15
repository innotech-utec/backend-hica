import { HistoriaClinica } from '../Models/HistoriaClinica.js';
import { Animal } from '../Models/Animal.js';

export const createHistoriaClinicaController = async (req, res) => {
  try {
    const { animalId } = req.body;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido para crear la historia clínica.' });
    }

    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ message: 'El animal proporcionado no existe.' });
    }

    const historiaClinica = await HistoriaClinica.create({ animalId });

    res.status(201).json(historiaClinica);
  } catch (error) {
    console.error('Error al crear la historia clínica:', error);
    res.status(500).json({ message: 'Error al crear la historia clínica. Por favor, intente nuevamente.' });
  }
};
