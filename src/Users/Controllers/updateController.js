import { User } from '../Models/User.js';

export const updateController = async (request, response) => {
    try {
        const userId = request.params.id;

        // Busca al usuario por su ID
        const user = await User.findByPk(userId);

        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }

        // Extrae los campos del cuerpo de la petición
        const { email, nombre, apellido, documento, isAdmin } = request.body;

        // Actualiza los campos
        user.email = email;
        user.nombre = nombre;
        user.apellido = apellido;
        user.documento = documento;
        user.isAdmin = isAdmin;

        // Guarda los cambios en la base de datos
        await user.save();

        // Responde con el usuario actualizado
        return response.status(200).json(user);

    } catch (error) {
        // Manejo de errores
        console.error("Error al actualizar el usuario:", error);
        return response.status(500).json({ message: "Error al actualizar el usuario" });
    }
};
