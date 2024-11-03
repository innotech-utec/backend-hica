import { Departamento } from "./Departamento.js";

export const seedDepartamentos = async () => {
  const existingCount = await Departamento.count();
  if (existingCount > 0) {
    console.log("Departamentos ya existen en la base de datos. No se ejecutará el seeder.");
    return; // Sale de la función si ya existen registros
  }

  const departamentosUruguay = [
    { nombre: "Artigas" },
    { nombre: "Canelones" },
    { nombre: "Cerro Largo" },
    { nombre: "Colonia" },
    { nombre: "Durazno" },
    { nombre: "Flores" },
    { nombre: "Florida" },
    { nombre: "Lavalleja" },
    { nombre: "Maldonado" },
    { nombre: "Montevideo" },
    { nombre: "Paysandú" },
    { nombre: "Río Negro" },
    { nombre: "Rivera" },
    { nombre: "Rocha" },
    { nombre: "Salto" },
    { nombre: "San José" },
    { nombre: "Soriano" },
    { nombre: "Tacuarembó" },
    { nombre: "Treinta y Tres" }
  ];

  try {
    await Departamento.bulkCreate(departamentosUruguay, { ignoreDuplicates: true });
    console.log("Departamentos de Uruguay insertados exitosamente");
  } catch (error) {
    console.error("Error al insertar departamentos:", error);
  }
};
