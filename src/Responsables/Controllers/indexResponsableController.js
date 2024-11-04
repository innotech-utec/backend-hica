import { Responsable } from '../Models/Responsable.js';
import { Departamento } from '../Models/Departamento.js';

export const indexResponsableController = async (req, res) => {
  try {
    const responsables = await Responsable.findAll({
      include: [{ model: Departamento, as: 'departamento' }]
    });
    res.json(responsables);
  } catch (error) {
    console.error("Error al obtener responsables:", error);
    res.status(500).json({ message: "Error al obtener responsables." });
  }
};
