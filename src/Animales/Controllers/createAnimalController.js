import { Animal } from '../Models/Animal.js';
import { HistoriaClinica } from '../Models/HistoriaClinica.js';

export const createAnimalController = async (req, res) => {
  const {
    nombre,
    especie,
    raza,
    edad,
    sexo,
    peso,
    responsableId,
  } = req.body;

  try {
    // Crear el nuevo animal
    const animal = await Animal.create({
      nombre,
      especie,
      raza,
      edad,
      sexo,
      peso,
      responsableId,
    });

    // Crear la historia clínica asociada al animal
    const historiaClinica = await HistoriaClinica.create({
      animalId: animal.id // Asigna el ID del animal
    });

    res.status(201).json({ animal, historiaClinica });
  } catch (error) {
    console.error('Error al crear el animal:', error);
    res.status(500).json({ message: 'Error al crear el animal.' });
  }
};
