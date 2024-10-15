import { FichaClinica } from '../Models/FichaClinica.js';
import { HistoriaClinica } from '../Models/HistoriaClinica.js';
import { Animal } from '../Models/Animal.js';

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
    estado,
  } = req.body;
  
  // Verificar si ya existe una ficha clínica abierta para el animal
  const fichaAbierta = await FichaClinica.findOne({
    where: { animalId: animalId, estado: 'ABIERTO' }
  });

  if (fichaAbierta) {
    return res.status(400).json({ message: "Ya existe una ficha clínica abierta para este animal." });
  }

    // Verificar si hay una historia clínica asociada al animal
    const historiaClinica = await HistoriaClinica.findOne({
      where: { animalId: animalId }
    });

    if (!historiaClinica) {
      return res.status(404).json({ message: "No se encontró una historia clínica asociada a este animal." });
    }
    try {
    // Crear la nueva ficha clínica
    const fichaClinica = await FichaClinica.create({
      motivoConsulta,
      sanitaria,
      ambiental,
      remotaFisiologica,
      remotaPatologica,
      proximaFisiologica,
      proximaPatologica,
      estado,
      animalId, // Asignar el ID del animal
      historiaClinicaId: historiaClinica.id // Asociar la historia clínica
    });

    // Responder con la ficha clínica creada
    res.status(201).json(fichaClinica);
  } catch (error) {
    console.error('Error al crear la ficha clínica:', error);
    res.status(500).json({ message: 'Error al crear la ficha clínica.' });
  }

};