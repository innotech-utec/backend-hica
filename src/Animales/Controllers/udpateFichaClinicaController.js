// src/Animales/Controllers/updateFichaClinicaController.js
import { FichaClinica } from '../Models/FichaClinica.js';

export const updateFichaClinicaController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params; // Obtener el ID desde los parámetros de la ruta

    const {
      motivoConsulta,
      sanitaria,
      ambiental,
      remotaFisiologica,
      remotaPatologica,
      proximaFisiologica,
      proximaPatologica,
      estadoFichaClinica,
    } = req.body;

    // Buscar la ficha clínica por su ID
    const fichaClinica = await FichaClinica.findByPk(fichaClinicaId);

    if (!fichaClinica) {
      return res.status(404).json({ message: 'Ficha clínica no encontrada' });
    }

    // Actualizar los campos de la ficha clínica
    fichaClinica.motivoConsulta = motivoConsulta;
    fichaClinica.sanitaria = sanitaria;
    fichaClinica.ambiental = ambiental;
    fichaClinica.remotaFisiologica = remotaFisiologica;
    fichaClinica.remotaPatologica = remotaPatologica;
    fichaClinica.proximaFisiologica = proximaFisiologica;
    fichaClinica.proximaPatologica = proximaPatologica;
    fichaClinica.estadoFichaClinica = estadoFichaClinica;

    // Guardar los cambios
    await fichaClinica.save();

    res.status(200).json(fichaClinica);
  } catch (error) {
    console.error('Error al actualizar la ficha clínica:', error);
    res.status(500).json({ message: 'Error al actualizar la ficha clínica' });
  }
};
