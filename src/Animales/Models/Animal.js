import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Animal = sequelize.define('animales', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  especie: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM('HEMBRA', 'MACHO'),
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2), // Se asume un valor máximo de 999.99 kg
    allowNull: true,
  },
  responsableId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

export { Animal };
