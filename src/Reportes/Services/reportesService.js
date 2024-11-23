import { FichaClinica } from '../../Animales/Models/FichaClinica.js';
import { Animal } from '../../Animales/Models/Animal.js';
import { Tratamiento } from '../../Animales/Models/Tratamiento.js';
import { Veterinario } from '../../Users/Models/Veterinarios.js';
import { ExamenObjetivo } from '../../Animales/Models/ExamenObjetivo.js';
import { User } from '../../Users/Models/User.js';
import { Op, Sequelize } from 'sequelize';
import { sequelize } from "../../database.js";

export class ReportesService {
  static #getDateRange(startDate, endDate) {
    const endDateAdjusted = new Date(endDate);
    endDateAdjusted.setDate(endDateAdjusted.getDate() + 1);
    
    return {
      fechaInicio: startDate || '1900-01-01',
      fechaFin: endDateAdjusted.toISOString().split('T')[0],
    };
  }

  static #isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(Date.parse(dateString));
  }

  static async getAnimalesFallecidos(startDate, endDate, groupBy = 'monthly') {
    if (startDate && !this.#isValidDate(startDate)) {
      throw new Error('Fecha de inicio inválida');
    }
    if (endDate && !this.#isValidDate(endDate)) {
      throw new Error('Fecha de fin inválida');
    }

    const { fechaInicio, fechaFin } = this.#getDateRange(startDate, endDate);

    try {
      return await FichaClinica.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('fichasClinicas.id')), 'cantidad'],
          [sequelize.col('fichasClinicas.updatedAt'), 'fechaModificacion'],
          [sequelize.col('animal.especie'), 'especie'],
          [sequelize.col('animal.edad'), 'edad'],
          [sequelize.col('animal.raza'), 'raza'],
          [sequelize.col('fichasClinicas.motivoConsulta'), 'motivoConsulta'],
          [sequelize.col('examenObjetivo.diagnostico'), 'diagnostico'],
        ],
        where: {
          estadoFichaClinica: 'Fallecimiento',
          updatedAt: { [Op.between]: [fechaInicio, fechaFin] },
        },
        include: [
          {
            model: Animal,
            as: 'animal',
            attributes: [],
          },
          {
            model: ExamenObjetivo,
            as: 'examenObjetivo',
            attributes: [],
          },
        ],
        group: [
          'fichasClinicas.updatedAt',
          'animal.especie',
          'animal.edad',
          'animal.raza',
          'fichasClinicas.motivoConsulta',
          'examenObjetivo.diagnostico',
        ],
        order: [[sequelize.col('fechaModificacion'), 'ASC']],
        raw: true,
      });
    } catch (error) {
      console.error('Error en getAnimalesFallecidos:', error);
      throw new Error('Error al obtener reporte de animales fallecidos');
    }
  }

  static async getAnimalesEutanasia(startDate, endDate, groupBy = 'monthly') {
    if (startDate && !this.#isValidDate(startDate)) {
      throw new Error('Fecha de inicio inválida');
    }
    if (endDate && !this.#isValidDate(endDate)) {
      throw new Error('Fecha de fin inválida');
    }

    const { fechaInicio, fechaFin } = this.#getDateRange(startDate, endDate);

    try {
      return await FichaClinica.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('fichasClinicas.id')), 'cantidad'],
          [sequelize.col('fichasClinicas.updatedAt'), 'fechaModificacion'],
          [sequelize.col('animal.especie'), 'especie'],
          [sequelize.col('animal.edad'), 'edad'],
          [sequelize.col('animal.raza'), 'raza'],
          [sequelize.col('fichasClinicas.motivoConsulta'), 'motivoConsulta'],
          [sequelize.col('examenObjetivo.diagnostico'), 'diagnostico'],
        ],
        where: {
          estadoFichaClinica: 'Eutanasia',
          updatedAt: { [Op.between]: [fechaInicio, fechaFin] },
        },
        include: [
          {
            model: Animal,
            as: 'animal',
            attributes: [],
          },
          {
            model: ExamenObjetivo,
            as: 'examenObjetivo',
            attributes: [],
          },
        ],
        group: [
          'fichasClinicas.updatedAt',
          'animal.especie',
          'animal.edad',
          'animal.raza',
          'fichasClinicas.motivoConsulta',
          'examenObjetivo.diagnostico',
        ],
        order: [[sequelize.col('fechaModificacion'), 'ASC']],
        raw: true,
      });
    } catch (error) {
      console.error('Error en getAnimalesEutanasia:', error);
      throw new Error('Error al obtener reporte de animales eutanasiados');
    }
  }

  static async getVeterinariosTratamientos(startDate, endDate, groupBy = 'monthly') {
    if (startDate && !this.#isValidDate(startDate)) {
      throw new Error('Fecha de inicio inválida');
    }
    if (endDate && !this.#isValidDate(endDate)) {
      throw new Error('Fecha de fin inválida');
    }

    const { fechaInicio, fechaFin } = this.#getDateRange(startDate, endDate);

    try {
      return await Tratamiento.findAll({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('tratamientos.id')), 'cantidadTratamientos'],
          [Sequelize.col('tratamientos.fecha'), 'fechaTratamiento'],
          [Sequelize.col('veterinario.user.nombre'), 'nombreVeterinario'],
          [Sequelize.col('veterinario.user.apellido'), 'apellidoVeterinario'],
        ],
        where: {
          fecha: { [Op.between]: [fechaInicio, fechaFin] },
        },
        include: [
          {
            model: Veterinario,
            as: 'veterinario',
            attributes: [],
            include: [
              {
                model: User,
                as: 'user',
                attributes: [],
              },
            ],
          },
        ],
        group: [
          'tratamientos.fecha',
          'veterinario.user.nombre',
          'veterinario.user.apellido',
        ],
        order: [[sequelize.col('fechaTratamiento'), 'ASC']],
        raw: true,
      });
    } catch (error) {
      console.error('Error en getVeterinariosTratamientos:', error);
      throw new Error('Error al obtener reporte de tratamientos por veterinario');
    }
  }
}