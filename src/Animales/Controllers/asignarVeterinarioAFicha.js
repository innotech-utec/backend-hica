import { FichaClinica } from '../models/FichaClinica.js';
import { Veterinario } from '../models/Veterinario.js';

export const asignarVeterinarioAFicha = async (req, res) => {
  try {
    const { fichaId, veterinarioId } = req.body;

    const ficha = await FichaClinica.findByPk(fichaId);
    const veterinario = await Veterinario.findByPk(veterinarioId);

    if (!ficha || !veterinario) {
      return res.status(404).json({
        message: 'Ficha clínica o veterinario no encontrado'
      });
    }

    await ficha.addVeterinario(veterinario);

    res.status(200).json({
      message: 'Veterinario asignado exitosamente',
      data: { fichaId, veterinarioId }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al asignar veterinario',
      error: error.message
    });
  }
};