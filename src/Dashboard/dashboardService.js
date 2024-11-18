import { FichaClinica } from '../Animales/Models/FichaClinica.js';

export const getInternados = async (req, res) => {
  try {

    // Consultar la historia clínica completa
    const internados = await FichaClinica.count({ 
      where: { 
        estadoFichaClinica: 'Internado'
      } 
    });

    res.status(200).json({
      internados
    });
  } catch (error) {
    console.error('Error al obtener internados:', error);
    res.status(500).json({ message: 'Error al obtener internados.' });
  }
};
