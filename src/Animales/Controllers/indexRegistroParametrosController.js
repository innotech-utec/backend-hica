import { RegistroParametros } from '../Models/RegistroParametros.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export const indexRegistroParametrosController = async (req, res) => {
  try {
    const { fichaClinicaId } = req.params;

    if (!fichaClinicaId) {
      return res.status(400).json({ message: 'El ID de la ficha clinica es requerida.' });
    }

    const parametros = await RegistroParametros.findAll({ where: { fichaClinicaId }, include: { model: FichaClinica, as: 'fichaClinica' } });
    res.status(200).json(parametros);
  } catch (error) {
    console.error('Error al obtener los registros de parámetros:', error);
    res.status(500).json({ message: 'Error al obtener los registros de parámetros.' });
  }
};
