import { Veterinario } from '../Models/Veterinarios.js';
import { sequelize } from '../../database.js'; // Asegúrate de tener esta línea

export const updateVeterinarioController = async (request, response) => {
  try {
    const { userId } = request.params; // Utilizamos el userId para buscar al veterinario

    // Busca al veterinario utilizando el userId
    const veterinario = await Veterinario.findOne({
      where: { userId } // Buscar por userId
    });
    if (!userId) {
        return response.status(400).json({ message: 'User ID es requerido.' });
      }
    if (!veterinario) {
      return response.status(404).json({ message: "Veterinario no encontrado" });
    }

    // Extrae los campos del cuerpo de la petición
    const { N_de_registro, Dependencia, Validado, deviceId } = request.body;
    const Foto = request.file ? request.file.buffer : null; // Si se está enviando una nueva imagen

    // Actualiza los campos
    veterinario.N_de_registro = N_de_registro || veterinario.N_de_registro;
    veterinario.Dependencia = Dependencia || veterinario.Dependencia;
    veterinario.Validado = Validado !== undefined ? Validado : veterinario.Validado;
    veterinario.deviceId = deviceId || veterinario.deviceId;

    if (Foto) {
      veterinario.Foto = Foto;  // Guardar la foto en formato BLOB
    }

    // Guarda los cambios
    await veterinario.save();

    return response.status(200).json(veterinario);

  } catch (error) {
    console.error('Error al actualizar el veterinario:', error);
    return response.status(500).json({ message: 'Error al actualizar el veterinario.' });
  }
};
