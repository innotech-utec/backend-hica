import { Tratamiento } from '../Models/Tratamiento.js';

export const autorizacionController = async (req, res) => {
  const { id, nuevoEstado } = req.params;

  console.log("Tratamiento recibido: ", id);
  console.log("Estado recibido: ", nuevoEstado);

  // Validar que el nuevo estado sea válido
  const estadosValidos = ['PENDIENTE', 'APROBADO', 'RECHAZADO'];
  if (!estadosValidos.includes(nuevoEstado)) {
    return res.status(400).json({ message: 'Estado de autorización no válido.' });
  }

  try {
    const tratamiento = await Tratamiento.findByPk(id);

    if (!tratamiento) {
      return res.status(404).json({ message: 'Tratamiento no encontrado.' });
    }

    // Evitar actualización innecesaria si el estado es el mismo
    if (tratamiento.estadoAutorizacion === nuevoEstado) {
      return res.status(200).json({ 
        message: 'El estado de autorización ya está actualizado.',
        tratamiento 
      });
    }

    tratamiento.estadoAutorizacion = nuevoEstado;
    await tratamiento.save();

    res.status(200).json({ 
      message: 'Estado de autorización actualizado con éxito.',
      tratamiento 
    });
  } catch (error) {
    console.error('Error al actualizar el estado de autorización:', error);
    res.status(500).json({ message: 'Error al actualizar el estado de autorización.' });
  }
};