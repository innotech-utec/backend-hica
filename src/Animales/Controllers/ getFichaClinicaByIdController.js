// src/Animales/Controllers/getFichaClinicaByIdController.js
import { FichaClinica } from '../Models/FichaClinica.js';
import { Animal } from '../Models/Animal.js';

export const getFichaClinicaByIdController = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la ficha clínica desde los parámetros
    try {
        const fichaClinica = await FichaClinica.findByPk(id, {
            include: [
                {
                    model: Animal,
                    as: 'animal', // Asegúrate de usar el alias correcto definido en tus relaciones
                },
            ],
        });

        if (!fichaClinica) {
            return res.status(404).json({ message: 'Ficha clínica no encontrada.' });
        }
        res.status(200).json(fichaClinica);
    } catch (error) {
        console.error('Error al obtener la ficha clínica:', error);
        res.status(500).json({ message: 'Error al obtener la ficha clínica.' });
    }
};
