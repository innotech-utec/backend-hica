import { Animal } from '../Models/Animal.js';
import edadAnimalController from './edadAnimalController.js';

export const updateAnimalController = async (req, res) => {
  try {
    const { animalId } = req.params; 
    const { nombre, especie, raza, edadValor,edadUnidad, sexo, peso } = req.body;

 
    const animal = await Animal.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    if (edadValor !== undefined && edadUnidad !== undefined) {
      edadAnimalController.validarDatosEdad(edadValor, edadUnidad);
      animal.edadValor = edadValor;
      animal.edadUnidad = edadUnidad;
    }
    // Actualizar los campos permitidos
    animal.nombre = nombre || animal.nombre;
    animal.especie = especie || animal.especie;
    animal.raza = raza || animal.raza;
     animal.sexo = sexo || animal.sexo;
    animal.peso = peso || animal.peso;

    // Guardar los cambios
    await animal.save();

    return res.status(200).json({ 
      message: 'Animal actualizado correctamente', 
      animal: {
        ...animal.dataValues,
        edadCompleta: `${edadValor} ${edadUnidad}`
      }
    });
  } catch (error) {
    console.error('Error al actualizar el animal:', error);
    return res.status(500).json({ 
      message: error.message || 'Error al actualizar el animal' 
    });
  }
};

   
