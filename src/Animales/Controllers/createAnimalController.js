// createAnimalController.js
import { Animal } from '../Models/Animal.js';
import { HistoriaClinica } from '../Models/HistoriaClinica.js';
import edadAnimalController from './edadAnimalController.js';

export const createAnimalController = async (req, res) => {
  const {
    nombre,
    especie,
    raza,
    edadValor,
    edadUnidad,
    sexo,
    peso,
    responsableId,
  } = req.body;

  try {
    // Validar los datos de edad
    edadAnimalController.validarDatosEdad(edadValor, edadUnidad);

    // Crear el nuevo animal
    const animal = await Animal.create({
      nombre: nombre.toUpperCase(),
      especie: especie.toUpperCase(),
      raza: raza.toUpperCase(),
      edadValor,
      edadUnidad,
      sexo,
      peso,
      responsableId,
    });

    // Crear la historia clínica asociada al animal
    const historiaClinica = await HistoriaClinica.create({
      animalId: animal.id
    });

   
    res.status(201).json({ 
      animal: {
        ...animal.dataValues,
        edadCompleta: `${edadValor} ${edadUnidad}`
      }, 
      historiaClinica 
    });
  } catch (error) {
    console.error('Error al crear el animal:', error);
    res.status(500).json({ 
      message: error.message || 'Error al crear el animal.' 
    });
  }
};