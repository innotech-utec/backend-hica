import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';


export const updateExamenObjetivoController = async (req, res) => {
  try {
    const { id } = req.params; // 

    const {
      FC,
      Resp,
      temperatura,
      condicionCorporal,
      sensorio,
      fascies,
      gangliosLinfaticos,
      pielSubcutaneo,
      mucosasAparentes,
      grandesFuncionales,
      actitudesAnomalas,
      EOP,
      paraclinicos,
      diagnostico,
      observaciones,
    } = req.body;

    // Buscar el tratamiento por su ID
    const examen = await ExamenObjetivo.findByPk(id);

    if (!examen) {
      return res.status(404).json({ message: 'Examen Objetivo no encontrado' });
    }

    // Actualizar los campos del tratamiento
    examen.FC = FC;
    examen.Resp = Resp;
    examen.temperatura = temperatura;
    examen.condicionCorporal = condicionCorporal;
    examen.sensorio = sensorio;
    examen.fascies=fascies
    examen.gangliosLinfaticos = gangliosLinfaticos;
    examen.pielSubcutaneo = pielSubcutaneo;
    examen.mucosasAparentes = mucosasAparentes;
    examen.grandesFuncionales = grandesFuncionales;
    examen.actitudesAnomalas=actitudesAnomalas;
    examen.EOP = EOP;
    examen.paraclinicos = paraclinicos;
    examen.diagnostico = diagnostico;
    examen.observaciones=observaciones;



    // Guardar los cambios
    await examen.save();

    res.status(200).json(examen);
  } catch (error) {
    console.error('Error al actualizar el examen objetivo:', error);
    res.status(500).json({ message: 'Error al actualizar el examen Objetivo' });
  }
};
