import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const getExamenObjetivoByFichaController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha clínica es requerido.' });
    }

    const examenObjetivo = await ExamenObjetivo.findOne({ where: { fichaClinicaId } });

    if (!examenObjetivo) {
      return res.status(404).json({ message: 'No se encontró un examen objetivo para esta ficha clínica.' });
    }

    res.status(200).json(examenObjetivo);
  } catch (error) {
    console.error('Error al obtener el examen objetivo:', error);
    res.status(500).json({ message: 'Error al obtener el examen objetivo. Intente nuevamente.' });
  }
};
