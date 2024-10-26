import { RegistroParametros } from '../Models/RegistroParametros.js';


export const udpateParametroController = async (req, res) => {
  try {
    const { id } = req.params; // ID del tratamiento

    const {
      fecha,
      hora,
      FC,
      FR,
      temperatura,
      mucosas,
      TllC,
      pliegueCutaneo,
      observaciones,
      
    } = req.body;

    // Buscar el tratamiento por su ID
    const parametro = await RegistroParametros.findByPk(id);

    if (!parametro) {
      return res.status(404).json({ message: 'Parametro no encontrado' });
    }


    parametro.fecha = fecha;
    parametro.hora = hora;
    parametro.FC = FC;
    parametro.FR = FR;
    parametro.temperatura = temperatura;
    parametro.mucosas = mucosas;
    parametro.TllC = TllC;
    parametro.pliegueCutaneo = pliegueCutaneo;
    parametro.observaciones = observaciones;

    // Guardar los cambios
    await parametro.save();

    res.status(200).json(observaciones);
  } catch (error) {
    console.error('Error al actualizar el parametro:', error);
    res.status(500).json({ message: 'Error al actualizar el parametro' });
  }
};
