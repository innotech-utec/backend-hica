import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';

export const updateExamenObjetivoController = async (req, res) => {
  try {
    const { id } = req.params;

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
    } = req.body;

    // Buscar el examen por su ID
    const examen = await ExamenObjetivo.findByPk(id);

    if (!examen) {
      return res.status(404).json({ message: 'Examen Objetivo no encontrado' });
    }

    // Validaciones para campos numéricos
    if (!FC || isNaN(parseFloat(FC))) {
      return res.status(400).json({ message: 'El campo "FC" debe ser un número.' });
    }
    if (!Resp || isNaN(parseFloat(Resp))) {
      return res.status(400).json({ message: 'El campo "Resp" debe ser un número.' });
    }
    if (temperatura !== undefined && temperatura !== '' && isNaN(parseFloat(temperatura))) {
      return res.status(400).json({ message: 'El campo "temperatura" debe ser un número.' });
    }

    // Actualizar los campos del examen
    examen.FC = parseFloat(FC);
    examen.Resp = parseFloat(Resp);
    examen.temperatura = temperatura ? parseFloat(temperatura) : null;
    examen.condicionCorporal = condicionCorporal;
    examen.sensorio = sensorio;
    examen.fascies = fascies;
    examen.gangliosLinfaticos = gangliosLinfaticos;
    examen.pielSubcutaneo = pielSubcutaneo;
    examen.mucosasAparentesTipo=mucosasAparentesTipo;
    examen.mucosasAparentesEstado=mucosasAparentesEstado;
    examen.grandesFuncionales = grandesFuncionales;
    examen.actitudesAnomalas = actitudesAnomalas;
    examen.EOP = EOP;
    examen.paraclinicos = paraclinicos;
    examen.diagnostico = diagnostico;
    examen.observaciones = observaciones;

    // Guardar los cambios
    await examen.save();

    res.status(200).json(examen);
  } catch (error) {
    console.error('Error al actualizar el examen objetivo:', error);
    res.status(500).json({ message: 'Error al actualizar el examen Objetivo' });
  }
};
