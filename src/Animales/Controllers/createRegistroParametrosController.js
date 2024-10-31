import { RegistroParametros } from '../Models/RegistroParametros.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const createRegistroParametrosController = async (req, res) => {
  try {
    const { fecha, hora, FC, FR, temperatura, mucosas, TllC, pliegueCutaneo, observaciones, fichaClinicaId } = req.body;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    const fichaClinica = await FichaClinica.findByPk(fichaClinicaId);
    if (!fichaClinica) {
      return res.status(404).json({ message: 'La ficha clínica proporcionada no existe.' });
    }

    const nuevoRegistro = await RegistroParametros.create({
      fecha,
      hora,
      FC,
      FR,
      temperatura,
      mucosas,
      TllC,
      pliegueCutaneo,
      observaciones,
      fichaClinicaId,
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error('Error al crear el registro de parámetros:', error);
    res.status(500).json({ message: 'Error al crear el registro de parámetros. Por favor, intente nuevamente.' });
  }
};
