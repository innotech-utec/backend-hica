import { Tratamiento } from '../Models/Tratamiento.js';
import { FichaClinica } from '../Models/FichaClinica.js';
import { Veterinario } from '../../Users/Models/Veterinarios.js';

export const getTratamientosVeterinarioController = async (req, res) => {
  try {
    const { veterinarioId } = req.params;

    if (!veterinarioId) {
      return res.status(400).json({ message: 'El ID del veterinario es requerido.' });
    }

    // Consultar los tratamientos asociados al animal
    const tratamientos = await Tratamiento.findAll({
      where: { veterinarioId },
      attributes: ['id', 'fecha', 'hora', 'medicacion', 'observaciones', 'estadoAutorizacion', 'fichaClinicaId', 'veterinarioId', 'createdAt'],
      order: [['createdAt', 'DESC']] // Ordenar los resultados por la fecha de creación
    });

    console.log('Tratamientos de BD:', tratamientos);

    res.status(200).json(tratamientos);
  } catch (error) {
    console.error('Error al obtener los tratamientos:', error);
    res.status(500).json({ message: 'Error al obtener los tratamientos.' });
  }
};
