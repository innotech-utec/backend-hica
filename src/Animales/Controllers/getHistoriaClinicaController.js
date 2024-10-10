import { Animal } from '../Models/Animal.js';
import { FichaClinica } from '../Models/FichaClinica.js';
import { ExamenObjetivo } from '../Models/ExamenObjetivo.js';
import { Tratamiento } from '../Models/Tratamiento.js';
import { RegistroParametros } from '../Models/RegistroParametros.js';

export const getHistoriaClinicaController = async (req, res) => {
  try {
    const { animalId } = req.params;

    if (!animalId) {
      return res.status(400).json({ message: 'El ID del animal es requerido.' });
    }

    // Verificar que el animal exista
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ message: 'El animal no existe.' });
    }

    // Consultar la historia clínica completa
    const fichasClinicas = await FichaClinica.findAll({ where: { animalId } });
    const examenesObjetivos = await ExamenObjetivo.findAll({ where: { animalId } });
    const tratamientos = await Tratamiento.findAll({ where: { animalId } });
    const registrosParametros = await RegistroParametros.findAll({ where: { animalId } });

    res.status(200).json({
      animal,
      fichasClinicas,
      examenesObjetivos,
      tratamientos,
      registrosParametros,
    });
  } catch (error) {
    console.error('Error al obtener la historia clínica completa:', error);
    res.status(500).json({ message: 'Error al obtener la historia clínica completa.' });
  }
};
