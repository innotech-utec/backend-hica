import { Departamento } from "./Departamento.js";

export const seedDepartamentos = async () => {
  const existingCount = await Departamento.count();
  if (existingCount > 0) {
    console.log("Departamentos ya existen en la base de datos. No se ejecutará el seeder.");
    return; // Sale de la función si ya existen registros
  }

  const departamentosUruguay = [
    { nombre: "ARTIGAS" },
    { nombre: "CANELONES" },
    { nombre: "CERRO LARGO" },
    { nombre: "COLONIA" },
    { nombre: "DURAZNO" },
    { nombre: "FLORES" },
    { nombre: "FLORIDA" },
    { nombre: "LAVALLEJA" },
    { nombre: "MALDONADO" },
    { nombre: "MONTEVIDEO" },
    { nombre: "PAYSANDU" },
    { nombre: "RIO NEGRO" },
    { nombre: "RIVERA" },
    { nombre: "ROCHA" },
    { nombre: "SALTO" },
    { nombre: "SAN JOSE" },
    { nombre: "SORIANO" },
    { nombre: "TACUAREMBO" },
    { nombre: "TREINTA Y TRES" }
  ];

  try {
    await Departamento.bulkCreate(departamentosUruguay, { ignoreDuplicates: true });
    console.log("Departamentos de Uruguay insertados exitosamente");
  } catch (error) {
    console.error("Error al insertar departamentos:", error);
  }
};
