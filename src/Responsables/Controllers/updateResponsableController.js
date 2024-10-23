import { Responsable } from '../Models/Responsable.js';

export const updateResponsableController = async (request, response) => {
    try {
        // Obtén el id correctamente desde request.params.id
        const { id } = request.params;

        // Busca el responsable por el ID
        const resp = await Responsable.findOne({
            where: { id } 
        });
       
        if (!resp) {
            return response.status(404).json({ message: "Responsable no encontrado" });
        }

        // Extrae los campos del cuerpo de la petición
        const { nombre, apellido, domicilio } = request.body;

        // Actualiza los campos
        resp.nombre = nombre;
        resp.apellido = apellido;
        resp.domicilio = domicilio;

        // Guarda los cambios en la base de datos
        await resp.save();

        // Responde con el usuario actualizado
        return response.status(200).json(resp);

    } catch (error) {
        // Manejo de errores
        console.error("Error al actualizar el responsable:", error);
        return response.status(500).json({ message: "Error al actualizar el responsable" });
    }
};
