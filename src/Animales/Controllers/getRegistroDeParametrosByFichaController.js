// getRegistroDeParametrosByFichaController.js
import { RegistroParametros } from '../Models/RegistroParametros.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const getRegistroDeParametrosByFichaController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha clínica es requerido.' });
    }

    const parametros = await RegistroParametros.findAll({ where: { fichaClinicaId } });

    if (!parametros || parametros.length === 0) {
      return res.status(404).json({ message: 'No se encontraron parámetros para esta ficha clínica.' });
    }

    res.status(200).json(parametros);
  } catch (error) {
    console.error('Error al obtener los parámetros:', error);
    res.status(500).json({ message: 'Error interno al obtener los parámetros. Intente nuevamente.' });
  }
};
