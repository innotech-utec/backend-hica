// src/Responsables/Models/Departamento.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js"; 

// Define el modelo de Departamento
const Departamento = sequelize.define("Departamento", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Departamento };
