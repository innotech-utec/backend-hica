import { Tratamiento } from '../Models/Tratamiento.js';


export const updateTratamientoController = async (req, res) => {
  try {
    const { id } = req.params; // ID del tratamiento

    const {
      fecha,
      hora,
      medicacion,
      observaciones,
      veterinarioId,
    } = req.body;

    // Buscar el tratamiento por su ID
    const tratamiento = await Tratamiento.findByPk(id);

    if (!tratamiento) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    // Actualizar los campos del tratamiento
    tratamiento.fecha = fecha;
    tratamiento.hora = hora;
    tratamiento.medicacion = medicacion;
    tratamiento.observaciones = observaciones;
    tratamiento.veterinarioId = veterinarioId;

    // Guardar los cambios
    await tratamiento.save();

    res.status(200).json(tratamiento);
  } catch (error) {
    console.error('Error al actualizar el tratamiento:', error);
    res.status(500).json({ message: 'Error al actualizar el tratamiento' });
  }
};
