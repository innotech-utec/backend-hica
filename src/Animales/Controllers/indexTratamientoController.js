import { Tratamiento } from '../Models/Tratamiento.js';
import { FichaClinica } from '../Models/FichaClinica.js';
import { Veterinario } from '../../Users/Models/Veterinarios.js';

export const indexTratamientoController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha es requerido.' });
    }

    // Consultar los tratamientos asociados al animal
    const tratamientos = await Tratamiento.findAll({
      where: { fichaClinicaId },
      include: [
        { model: Veterinario, as: 'veterinario' } // Incluir el modelo de veterinario (usuario)
      ],
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
