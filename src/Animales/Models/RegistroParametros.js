import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const RegistroParametros = sequelize.define(
  'RegistroParametros',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    FC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperatura: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    mucosas: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    TllC: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pliegueCutaneo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fichaClinicaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Sequelize añade automáticamente createdAt y updatedAt
    paranoid: true,   // Sequelize añade automáticamente deletedAt para eliminaciones lógicas
  }
);

export { RegistroParametros };
