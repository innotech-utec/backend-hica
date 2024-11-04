import { Veterinario } from '../Models/Veterinarios.js';
import { sequelize } from '../../database.js';
import { uploadToCloudinary } from '../../../config/cloudinary.js';

export const updateVeterinarioController = async (request, response) => {
  const t = await sequelize.transaction(); // Iniciamos una transacción

  try {
    const { userId } = request.params;

    if (!userId) {
      return response.status(400).json({ message: 'User ID es requerido.' });
    }

    // Busca al veterinario utilizando el userId
    const veterinario = await Veterinario.findOne({
      where: { userId },
      transaction: t
    });

    if (!veterinario) {
      await t.rollback();
      return response.status(404).json({ message: "Veterinario no encontrado" });
    }

    // Extrae los campos del cuerpo de la petición
    const { N_de_registro, Dependencia, Validado, deviceId, Foto } = request.body;

    // Si hay una nueva foto, súbela a Cloudinary
    let fotoUrl = veterinario.Foto; // Mantén la foto actual por defecto
    if (Foto) {
      try {
        console.log("Subiendo nueva foto a Cloudinary");
        fotoUrl = await uploadToCloudinary(Foto);
      } catch (cloudinaryError) {
        console.error('Error al subir imagen a Cloudinary:', cloudinaryError);
        await t.rollback();
        return response.status(500).json({ message: 'Error al procesar la imagen.' });
      }
    }

    // Actualiza los campos
    const veterinarioActualizado = await veterinario.update({
      N_de_registro: N_de_registro || veterinario.N_de_registro,
      Dependencia: Dependencia || veterinario.Dependencia,
      Validado: Validado !== undefined ? Validado : veterinario.Validado,
      deviceId: deviceId || veterinario.deviceId,
      Foto: fotoUrl // Actualiza con la nueva URL o mantiene la existente
    }, { transaction: t });

    await t.commit();

    return response.status(200).json({
      veterinario: {
        id: veterinarioActualizado.id,
        N_de_registro: veterinarioActualizado.N_de_registro,
        Validado: veterinarioActualizado.Validado,
        Dependencia: veterinarioActualizado.Dependencia,
        Foto: veterinarioActualizado.Foto,
        userId: veterinarioActualizado.userId
      }
    });

  } catch (error) {
    await t.rollback();
    console.error('Error al actualizar el veterinario:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return response.status(400).json({ 
        message: 'Ya existe un veterinario con ese número de registro o dispositivo.' 
      });
    }
    
    return response.status(500).json({ message: 'Error al actualizar el veterinario.' });
  }
};