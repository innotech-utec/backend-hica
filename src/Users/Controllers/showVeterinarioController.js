import { Veterinario } from '../Models/Veterinarios.js';

export const showVeterinarioController = async (req, res) => {
  const { userId } = req.params;

  try {
    const veterinario = await Veterinario.findOne({
      where: { userId }
    });

    if (!veterinario) {
      return res.status(404).json({ message: 'Veterinario no encontrado.' });
    }

    res.status(200).json(veterinario);
  } catch (error) {
    console.error('Error al obtener el veterinario:', error);
    res.status(500).json({ message: 'Error al obtener el veterinario.' });
  }
};