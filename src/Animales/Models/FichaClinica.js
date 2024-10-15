import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const FichaClinica = sequelize.define('fichasClinicas', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  motivoConsulta: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  sanitaria: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ambiental: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  remotaFisiologica: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  remotaPatologica: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  proximaFisiologica: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  proximaPatologica: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  animalId: { // Esta columna debe estar definida
    type: DataTypes.UUID,
    allowNull: false,
  },
  historiaClinicaId: { // Asegúrate de que esta columna esté definida
    type: DataTypes.UUID,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('ABIERTO', 'CERRADO'),
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export { FichaClinica };
