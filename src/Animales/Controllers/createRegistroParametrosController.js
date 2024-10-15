import { RegistroParametros } from '../Models/RegistroParametros.js';
import { Animal } from '../Models/Animal.js';

export const createRegistroParametrosController = async (req, res) => {
  try {
    const { fecha, hora, FC, FR, temperatura, mucosas, TllC, pliegueCutaneo, observaciones, animalId } = req.body;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ message: 'El animal proporcionado no existe.' });
    }

    const nuevoRegistro = await RegistroParametros.create({
      fecha,
      hora,
      FC,
      FR,
      temperatura,
      mucosas,
      TllC,
      pliegueCutaneo,
      observaciones,
      animalId,
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al crear el registro de parámetros:', error);
    res.status(500).json({ message: 'Error al crear el registro de parámetros. Por favor, intente nuevamente.' });
  }
};
