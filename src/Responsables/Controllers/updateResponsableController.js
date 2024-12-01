// ./Responsables/Controllers/updateResponsableController.js
import { Responsable } from '../Models/Responsable.js';




export const updateResponsableController = async (request, response) => {
    try {
        const { id } = request.params;
        const { documento, nombre, apellido, domicilio, telefono, departamentoId, localidadId } = request.body;

        const resp = await Responsable.findOne({ where: { id } });
        if (!resp) {
            return response.status(404).json({ message: "Responsable no encontrado" });
        }

        // Actualizar los campos
        resp.documento = documento;
        resp.nombre = nombre;
        resp.apellido = apellido;
        resp.domicilio = domicilio;
        resp.telefono = telefono;
        resp.departamentoId = departamentoId;
        resp.localidadId = localidadId;

        await resp.save();

        return response.status(200).json(resp);
    } catch (error) {
        console.error("Error al actualizar el responsable:", error);
        return response.status(500).json({ message: "Error al actualizar el responsable" });
    }
};
