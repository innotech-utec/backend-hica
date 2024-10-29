// Controllers/indexFichaClinicaController.js
import { Animal } from '../Models/Animal.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export async function indexFichaClinicaController(req, res) {
  try {
    const { animalId } = req.params; // Obtén el animalId desde los parámetros de la URL

    const fichas = await FichaClinica.findAll({
      where: { animalId },  // Filtra las fichas por el animalId
      include: [
        {
          model: Animal,
          as: 'animal',
        },
      ],
    });

    res.json(fichas);
  } catch (error) {
    console.error('Error al obtener las fichas clínicas:', error);
    res.status(500).json({ message: 'Error al obtener las fichas clínicas' });
  }
}
