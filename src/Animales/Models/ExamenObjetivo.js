import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const ExamenObjetivo = sequelize.define('examenObjetivo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  FC: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Resp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  temperatura: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
  },
  condicionCorporal: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  sensorio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fascies: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  gangliosLinfaticos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pielSubcutaneo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mucosasAparentes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  grandesFuncionales: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  actitudesAnomalas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  EOP: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paraclinicos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fichaClinicaId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true, // Relación 1 a 1 con Ficha Clínica
  },
}, {
  timestamps: true,
  paranoid: true,
});

export { ExamenObjetivo };
