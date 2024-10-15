import { User } from '../../Users/Models/User.js'; 
import { Veterinario } from '../../Users/Models/Veterinarios.js';
import { sequelize } from '../../database.js'; // Asegúrate de importar tu instancia de Sequelize

export const createVeterinarioController = async (request, response) => {
  const { N_de_registro, Validado, deviceId, Dependencia, Foto, userId } = request.body;

  // Validar campos obligatorios
  if (!N_de_registro) {
    return response.status(400).json({ message: 'El campo N_de_registro no puede estar vacío.' });
  }
  if (!Dependencia) {
    return response.status(400).json({ message: 'El campo Dependencia no puede estar vacío.' });
  }
  if (!userId) {
    return response.status(400).json({ message: 'El campo userId es obligatorio.' });
  }

  const t = await sequelize.transaction();

  try {
    // Verificar si el usuario existe en la base de datos
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      await t.rollback();
      return response.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Crear el veterinario asociado al usuario
    const veterinario = await Veterinario.create({
      N_de_registro,
      Validado: Validado || false,  
      deviceId: deviceId || null, 
      Dependencia,
      Foto: Foto || null,           
      userId  
    }, { transaction: t });

    await t.commit();

    console.log('Veterinario creado con éxito:', veterinario);

    return response.status(201).json({
      veterinario: {
        id: veterinario.id,
        N_de_registro: veterinario.N_de_registro,
        Validado: veterinario.Validado,
        deviceId: veterinario.deviceId,
        Dependencia: veterinario.Dependencia,
        Foto: veterinario.Foto,
        userId: veterinario.userId
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear veterinario:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return response.status(400).json({ message: 'Ya existe un veterinario con ese número de registro o dispositivo.' });
    }
    return response.status(500).json({ message: 'Error al crear veterinario.' });
  }
};