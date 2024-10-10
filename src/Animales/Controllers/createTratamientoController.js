import { Tratamiento } from '../Models/Tratamiento.js';
import { Animal } from '../Models/Animal.js';
import { User } from '../../Users/Models/User.js';

export const createTratamientoController = async (req, res) => {
  try {
    const { fecha, hora, medicacion, observaciones, estadoAutorizacion = 'PENDIENTE', animalId, veterinarioId, fichaClinicaId } = req.body;

    if (!animalId || !veterinarioId || !fichaClinicaId || !fecha || !hora || !medicacion) {
      return res.status(400).json({ message: 'Faltan campos requeridos para crear el tratamiento.' });
    }

    // Validar el estado de autorización
    if (!['PENDIENTE', 'APROBADO', 'RECHAZADO'].includes(estadoAutorizacion)) {
      return res.status(400).json({ message: 'Error en el estado del tratamiento.' });
    }

    // Validar la existencia del veterinario
    const veterinario = await User.findByPk(veterinarioId);
    if (!veterinario) {
      return res.status(404).json({ message: 'El veterinario proporcionado no existe.' });
    }

    // Crear el nuevo tratamiento en la base de datos
    const nuevoTratamiento = await Tratamiento.create({
      fecha,
      hora,
      medicacion,
      observaciones,
      estadoAutorizacion,
      animalId,
      veterinarioId,
      fichaClinicaId,
    });

    res.status(201).json(nuevoTratamiento);
  } catch (error) {
    console.error('Error al crear el tratamiento:', error);
    res.status(500).json({ message: 'Error al crear el tratamiento. Por favor, intente nuevamente.' });
  }
};
