import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const createExamenObjetivoController = async (req, res) => {
  try {
    const {
      FC,
      Resp,
      temperatura,
      condicionCorporal,
      sensorio,
      fascies,
      gangliosLinfaticos,
      pielSubcutaneo,
      mucosasAparentesTipo,
      mucosasAparentesEstado,
      grandesFuncionales,
      actitudesAnomalas,
      EOP,
      paraclinicos,
      diagnostico,
      observaciones,
      fichaClinicaId
    } = req.body;

    // Validación del ID de la ficha clínica
    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha clínica es requerido.' });
    }

    // Validar campos numéricos
    if (isNaN(FC)) {
      return res.status(400).json({ message: 'El campo "FC" debe ser un número.' });
    }
    if (isNaN(Resp)) {
      return res.status(400).json({ message: 'El campo "Resp" debe ser un número.' });
    }
    if (temperatura !== undefined && isNaN(temperatura)) {
      return res.status(400).json({ message: 'El campo "temperatura" debe ser un número.' });
    }

    
    const fichaClinica = await FichaClinica.findByPk(fichaClinicaId);
    if (!fichaClinica) {
      return res.status(404).json({ message: 'La ficha clínica proporcionada no existe.' });
    }

    
    const examenExistente = await ExamenObjetivo.findOne({ where: { fichaClinicaId } });
    if (examenExistente) {
      return res.status(400).json({ message: 'Ya existe un examen objetivo para esta ficha clínica.' });
    }

    // Crear nuevo examen objetivo
    const nuevoExamen = await ExamenObjetivo.create({
      FC,
      Resp,
      temperatura,
      condicionCorporal,
      sensorio,
      fascies,
      gangliosLinfaticos,
      pielSubcutaneo,
      mucosasAparentesTipo,
      mucosasAparentesEstado,
      grandesFuncionales,
      actitudesAnomalas,
      EOP,
      paraclinicos,
      diagnostico,
      observaciones,
      fichaClinicaId,
    });

    res.status(201).json(nuevoExamen);
  } catch (error) {
    console.error('Error al crear el examen objetivo:', error);
    res.status(500).json({ message: 'Error al crear el examen objetivo. Por favor, intente nuevamente.' });
  }
};
