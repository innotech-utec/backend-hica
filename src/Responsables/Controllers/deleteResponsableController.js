import { Responsable } from '../Models/Responsable.js';
import { Animal } from '../../Animales/Models/Animal.js';

export const deleteResponsableController = async (request, response) => {
    try {
        const { id } = request.params;

        // Buscar el responsable por ID
        const resp = await Responsable.findOne({
            where: { id }
        });

        if (!resp) {
            return response.status(404).json({ message: "Responsable no encontrado" });
        }

        // Verificar si el responsable tiene algún animal asignado
        const animalesAsignados = await Animal.findAll({
            where: { responsableId: id }  // Asumiendo que existe una columna responsableId en la tabla de animales
        });

        if (animalesAsignados.length > 0) {
            return response.status(400).json({ message: "No es posible eliminar al responsable porque tiene animales asignados." });
        }

        // Si no tiene animales asignados, proceder con la eliminación
        await resp.destroy();

        return response.status(200).json({ message: "Responsable eliminado correctamente." });

    } catch (error) {
        console.error("Error al eliminar el responsable:", error);
        return response.status(500).json({ message: "Error al eliminar el responsable." });
    }
};
