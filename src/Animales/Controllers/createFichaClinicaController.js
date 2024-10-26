import { FichaClinica } from '../Models/FichaClinica.js';
import { HistoriaClinica } from '../Models/HistoriaClinica.js';

export const createFichaClinicaController = async (req, res) => {
  const {
    animalId,
    motivoConsulta,
    sanitaria,
    ambiental,
    remotaFisiologica,
    remotaPatologica,
    proximaFisiologica,
    proximaPatologica,
    estadoFichaClinica, // Nuevo campo
  } = req.body;

  // Verificar si ya existe una ficha clínica abierta
  const fichaAbierta = await FichaClinica.findOne({
    where: { animalId, estadoFichaClinica: 'INGRESADO' },
  });

  if (fichaAbierta) {
    return res.status(400).json({ message: "Ya existe una ficha clínica abierta para este animal." });
  }

  // Verificar si hay una historia clínica asociada
  const historiaClinica = await HistoriaClinica.findOne({
    where: { animalId },
  });

  if (!historiaClinica) {
    return res.status(404).json({ message: "No se encontró una historia clínica asociada a este animal." });
  }

  try {
    // Crear la ficha clínica
    const fichaClinica = await FichaClinica.create({
      motivoConsulta,
      sanitaria,
      ambiental,
      remotaFisiologica,
      remotaPatologica,
      proximaFisiologica,
      proximaPatologica,
      estadoFichaClinica, // Almacenar el estado
      animalId,
      historiaClinicaId: historiaClinica.id,
    });

    res.status(201).json(fichaClinica);
  } catch (error) {
    console.error('Error al crear la ficha clínica:', error);
    res.status(500).json({ message: 'Error al crear la ficha clínica.' });
  }
};
