// ./Responsables/Controllers/showResponsableController.js
import { getResponsableById } from '../Services/responsableService.js';

export const showResponsableController = async (req, res) => {
  try {
    const responsableId = req.params.id; // Obtener el ID desde los parámetros de la URL
    console.log('ID recibido en el backend:', responsableId); // Asegúrate de que el backend recibe el ID correctamente

    // Llamar al servicio para obtener el responsable por ID
    const responsable = await getResponsableById(responsableId);

    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    // Devolver los datos del responsable en la respuesta
    res.status(200).json(responsable);
  } catch (error) {
    console.error('Error al obtener el responsable:', error);
    res.status(500).json({ message: 'Error al obtener el responsable' });
  }
};
