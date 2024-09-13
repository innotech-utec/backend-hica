import { Veterinario } from '../Models/Veterinarios.js';
import { User } from '../Models/User.js';

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

    try {
        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return response.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Crear el veterinario
        const veterinario = await Veterinario.create({
            N_de_registro,
            Validado: Validado || null,  // Puede ser nulo
            deviceId: deviceId || null,  // Puede ser nulo
            Dependencia,
            Foto: Foto || null,  // Puede ser nulo
            userId
        });

        return response.status(201).json({
            id: veterinario.id,
            N_de_registro: veterinario.N_de_registro,
            Validado: veterinario.Validado,
            deviceId: veterinario.deviceId,
            Dependencia: veterinario.Dependencia,
            Foto: veterinario.Foto,
            userId: veterinario.userId
        });
    } catch (error) {
        console.error('Error al crear veterinario:', error);
        return response.status(500).json({ message: 'Error al crear veterinario.' });
    }
};
