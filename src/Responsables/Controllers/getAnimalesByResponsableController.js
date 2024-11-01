// src/Responsables/Controllers/getAnimalesByResponsableController.js
import { Animal } from '../../Animales/Models/Animal.js';

export const getAnimalesByResponsableController = async (req, res) => {
  try {
    const { id } = req.params;
    const animales = await Animal.findAll({
      where: { responsableId: id },
      attributes: ['id', 'nombre', 'especie', 'raza', 'edad']
    });
    res.json(animales);
  } catch (error) {
    console.error('Error al obtener animales del responsable:', error);
    res.status(500).json({ message: 'Error al obtener los animales del responsable' });
  }
};
