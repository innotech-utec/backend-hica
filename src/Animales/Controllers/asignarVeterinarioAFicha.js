import { FichaClinica } from '../Models/FichaClinica.js';
import { Animal } from '../Models/Animal.js';
import { Veterinario } from '../../Users/Models/Veterinarios.js';
import { User } from '../../Users/Models/User.js';

export const asignarVeterinarioAFicha = async (req, res) => {
  try {

    const { fichaClinicaId, veterinarioId } = req.body;

    console.log("Solicitud de asignacion recibida:");
    console.log(fichaClinicaId);
    console.log(veterinarioId);

    const ficha = await FichaClinica.findByPk(fichaClinicaId);
    const veterinario = await Veterinario.findByPk(veterinarioId);

    if (!ficha) {
      return res.status(404).json({
        message: 'Ficha clínica no encontrada'
      });
    }
    if (!veterinario) {
        return res.status(404).json({
          message: 'Veterinario no encontrado'
        });
      }

    await ficha.addVeterinario(veterinario);

    res.status(200).json({
      message: 'Veterinario asignado exitosamente',
      data: { fichaClinicaId, veterinarioId }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error al asignar veterinario',
      error: error.message
    });
  }
};

export const getVeterinariosByFicha = async (req, res) => {
    try {
      const { fichaClinicaId } = req.params;
  
      const ficha = await FichaClinica.findByPk(fichaClinicaId, {
        include: [{
          model: Veterinario,
          as: 'veterinarios',
          include: [{
            model: User,
            as: 'user',
            attributes: ['nombre', 'apellido']
          }]
        }]
      });
  
      if (!ficha) {
        return res.status(404).json({
          message: 'Ficha clínica no encontrada'
        });
      }
  
      res.status(200).json({
        veterinarios: ficha.veterinarios
      });
  
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener veterinarios',
        error: error.message
      });
    }
  };

  export const getFichasByVeterinario = async (req, res) => {
    try {
      const { veterinarioId } = req.params;
  
      const veterinario = await Veterinario.findByPk(veterinarioId, {
        include: [{
          model: FichaClinica,
          as: 'fichasClinicas',
          where: {
            estadoFichaClinica: ['INGRESADO', 'INTERNADO']
          },
          include: [{
            model: Animal,
            as: 'animal',
            attributes: ['nombre', 'especie', 'raza']
          }]
        }]
      });
  
      if (!veterinario) {
        return res.status(404).json({
          message: 'Veterinario no encontrado'
        });
      }
  
      res.status(200).json({
        fichas: veterinario.fichasClinicas
      });
  
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener fichas clínicas',
        error: error.message
      });
    }
  };