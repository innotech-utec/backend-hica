// indexFichaClinicaAbiertaController.js
import { FichaClinica } from '../Models/FichaClinica.js';

export const indexFichaClinicaAbiertaController = async (req, res) => {
    const { animalId } = req.params; // Obtener el ID del animal

    try {
        const fichasAbiertas = await FichaClinica.findAll({
            where: {
                animalId: animalId,
                estado: 'ABIERTO' // Asegúrate de que este campo esté en tu modelo
            }
        });

        res.json(fichasAbiertas); // Devuelve las fichas clínicas abiertas
    } catch (error) {
        console.error('Error al obtener fichas clínicas abiertas:', error);
        res.status(500).json({ message: 'Error al obtener fichas clínicas abiertas' });
    }
};
