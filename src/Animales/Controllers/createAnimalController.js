import { Animal } from '../Models/Animal.js'; // Asegúrate de que esta ruta sea correcta
import { Responsable } from '../../Responsables/Models/Responsable.js'; // Asegúrate de que esta ruta sea correcta

export const createAnimalController = async (req, res) => {
  try {
    
    const { nombre, especie, raza, edad, responsableId } = req.body;

    
    if (!nombre || !especie || !raza || !edad || !responsableId) {
      return res.status(400).json({ message: 'Faltan campos requeridos para crear un animal.' });
    }

   
    const responsable = await Responsable.findByPk(responsableId);
    if (!responsable) {
      return res.status(404).json({ message: 'El responsable proporcionado no existe.' });
    }

    // Crear el nuevo animal en la base de datos
    const nuevoAnimal = await Animal.create({
      nombre,
      especie,
      raza,
      edad,
      responsableId,
    });

    // Devolver el animal creado
    res.status(201).json(nuevoAnimal);
  } catch (error) {
    console.error('Error al crear el animal:', error);
    res.status(500).json({ message: 'Error al crear el animal. Por favor, intente nuevamente.' });
  }
};
