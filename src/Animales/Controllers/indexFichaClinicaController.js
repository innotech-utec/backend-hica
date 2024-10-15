
import { Animal } from '../Models/Animal.js';
import { FichaClinica } from '../Models/FichaClinica.js';

export async function indexFichaClinicaController(req, res) {
  try {
    const fichas = await FichaClinica.findAll({
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
