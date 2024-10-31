// src/seeders/runSeeders.js

import { seedDepartamentos } from "../Responsables/Models/DepartamentoSeeders.js";

const runSeeders = async () => {
  try {
    await seedDepartamentos();
    console.log("Seeder de departamentos ejecutado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar seeder de departamentos:", error);
    process.exit(1);
  }
};

runSeeders();
