import { User } from '../Models/User.js';
import { Veterinario } from '../Models/Veterinarios.js';
import { Tratamiento } from '../../Animales/Models/Tratamiento.js';

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario es un veterinario
    const veterinario = await Veterinario.findOne({ where: { userId:id } });

    if (veterinario) {
      // Verificar si el veterinario tiene tratamientos asignados
      const tratamientos = await Tratamiento.findAll({ where: {veterinarioId: veterinario.id } });

      if (tratamientos.length > 0) {
        return res.status(400).json({ message: 'Este veterinario tiene tratamientos asignados. Debes reasignar los tratamientos antes de eliminarlo.' });
      }
    }

    // Si no es veterinario o no tiene tratamientos, proceder con la eliminación del usuario
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario.' });
  }
};
