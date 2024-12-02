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
    estadoFichaClinica,
  } = req.body;

  try {
    // Verificar si ya existe una ficha clínica abierta
    const fichaAbierta = await FichaClinica.findOne({
      where: { animalId, estadoFichaClinica: 'INGRESADO' },
    });

    if (fichaAbierta) {
      return res.status(400).json({ message: "Ya existe una ficha clínica abierta para este animal." });
    }

    // Verificar si hay una historia clínica asociada
    let historiaClinica = await HistoriaClinica.findOne({ where: { animalId } });

    if (!historiaClinica) {
      // Si no existe historia clínica, crea una nueva
      historiaClinica = await HistoriaClinica.create({ animalId });
    } else {
      // Verificar el estado de todas las fichas clínicas de la historia clínica
      const fichasPrevias = await FichaClinica.findAll({
        where: { historiaClinicaId: historiaClinica.id },
      });

      const tieneFichasActivas = fichasPrevias.some(ficha =>
        ['INGRESADO'].includes(ficha.estadoFichaClinica)
      );

      if (tieneFichasActivas) {
        return res.status(400).json({ message: "Solo se puede crear una nueva ficha clínica si todas las anteriores están en estado Alta, Fallecimiento o Eutanasia." });
      }
    }

    // Crear la nueva ficha clínica
    const fichaClinica = await FichaClinica.create({
      motivoConsulta,
      sanitaria,
      ambiental,
      remotaFisiologica,
      remotaPatologica,
      proximaFisiologica,
      proximaPatologica,
      estadoFichaClinica,
      animalId,
      historiaClinicaId: historiaClinica.id,
    });

    res.status(201).json(fichaClinica);
  } catch (error) {
    console.error('Error al crear la ficha clínica:', error);
    res.status(500).json({ message: 'Error al crear la ficha clínica.' });
  }
};
