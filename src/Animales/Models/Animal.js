// Animales.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Animal = sequelize.define('animales', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    especie: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    responsableId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true,  
    paranoid: true
});

export {Animal};
