import { ReportesService } from '../Services/reportesService.js';

export const getAnimalesFallecidos = async (req, res) => {
  try {
    const { startDate, endDate, groupBy } = req.query;
    const data = await ReportesService.getAnimalesFallecidos(startDate, endDate, groupBy);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAnimalesFallecidos:', error.message);
    res.status(500).json({ error: 'Error al obtener reporte de animales fallecidos' });
  }
};

export const getAnimalesEutanasia = async (req, res) => {
  try {
    const { startDate, endDate, groupBy } = req.query;
    const data = await ReportesService.getAnimalesEutanasia(startDate, endDate, groupBy);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getAnimalesEutanasia:', error.message);
    res.status(500).json({ error: 'Error al obtener reporte de animales eutanasiados' });
  }
};

export const getVeterinariosTratamientos = async (req, res) => {
  try {
    const { startDate, endDate, groupBy } = req.query;
    const data = await ReportesService.getVeterinariosTratamientos(startDate, endDate, groupBy);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en getVeterinariosTratamientos:', error.message);
    res.status(500).json({ error: 'Error al obtener reporte de tratamientos por veterinario' });
  }
};
