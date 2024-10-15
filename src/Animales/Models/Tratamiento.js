// models/Tratamiento.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Tratamiento = sequelize.define('tratamientos', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  medicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estadoAutorizacion: {
    type: DataTypes.ENUM('PENDIENTE', 'APROBADO', 'RECHAZADO'),
    defaultValue: 'PENDIENTE', // Estado por defecto
    allowNull: false,
  },
  fichaClinicaId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  veterinarioId: { // Añadimos el campo de responsable
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export { Tratamiento };
