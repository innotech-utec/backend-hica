import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const indexExamenObjetivoController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha clínica es requerido.' });
    }

    // Buscar el examen objetivo asociado a la ficha clínica
    const examenes = await ExamenObjetivo.findAll({ where: { fichaClinicaId }, include: { model: FichaClinica, as: 'fichaClinica' } });
    
    if (examenes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron exámenes para la ficha clínica.' });
    }

    res.status(200).json(examenes);
  } catch (error) {
    console.error('Error al obtener los exámenes objetivos:', error);
    res.status(500).json({ message: 'Error al obtener los exámenes objetivos.' });
  }
};
