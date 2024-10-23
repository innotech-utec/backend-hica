import { Animal } from '../Models/Animal.js';

export const updateAnimalController = async (req, res) => {
  try {
    const { animalId } = req.params; // Asegúrate de que estás capturando animalId correctamente
    const { nombre, especie, raza, edad, sexo, peso } = req.body;

    // Verificar que el ID del animal existe en la base de datos
    const animal = await Animal.findByPk(animalId);

    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }

    // Actualizar los campos permitidos
    animal.nombre = nombre || animal.nombre;
    animal.especie = especie || animal.especie;
    animal.raza = raza || animal.raza;
    animal.edad = edad || animal.edad;
    animal.sexo = sexo || animal.sexo;
    animal.peso = peso || animal.peso;

    // Guardar los cambios
    await animal.save();

    return res.status(200).json({ message: 'Animal actualizado correctamente', animal });
  } catch (error) {
    console.error('Error al actualizar el animal:', error);
    return res.status(500).json({ message: 'Error al actualizar el animal' });
  }
};
