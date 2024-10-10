import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const HistoriaClinica = sequelize.define('historiaClinica', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true, // Asegúrate de que cada animal tenga solo una historia clínica
  },
}, {
  timestamps: true,
  paranoid: true,
});

export { HistoriaClinica };
