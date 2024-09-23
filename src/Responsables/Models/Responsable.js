// Responsables.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Responsable = sequelize.define('responsables', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    documento: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    domicilio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
  
}, {
    timestamps: true,
    paranoid: true  
});


export { Responsable };
