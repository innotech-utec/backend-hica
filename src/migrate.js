import { Sequelize } from "sequelize";
import { sequelize } from './database.js';
import setupRelationships from './relationships.js';
import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';
import { Responsable } from './Responsables/Models/Responsable.js';
import { Animal } from './Animales/Models/Animal.js';
import { ExamenObjetivo } from "./Animales/Models/ExamenObjetivo.js";
import { FichaClinica } from "./Animales/Models/FichaClinica.js";
import { HistoriaClinica } from "./Animales/Models/HistoriaClinica.js";
import { RegistroParametros } from "./Animales/Models/RegistroParametros.js";
import { Tratamiento } from "./Animales/Models/Tratamiento.js";
import { Departamento } from './Responsables/Models/Departamento.js';
import { seedDepartamentos } from './Responsables/Models/DepartamentoSeeders.js';
import { Reseña } from './Animales/Models/Reseña.js';

import Articulo from "./Facturas/Models/Articulo.js";
import { Factura } from "./Facturas/Models/Factura.js";
import { FacturaArticulos } from "./Facturas/Models/FacturaArticulo.js";

//Generar BD

await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

await User.sync({ alter: true });
await Veterinario.sync({ force: false });
await Animal.sync({ alter: true });
await Responsable.sync({ alter: true });  

await FichaClinica.sync({ alter: true });
await ExamenObjetivo.sync({ alter: true });

await RegistroParametros.sync({ alter: true }); 
await Tratamiento.sync({ alter: true }); 
await HistoriaClinica.sync({ force: true }); 

await Articulo.sync({ force: true }); 
await Factura.sync({ alter: true }); 
await FacturaArticulos.sync({ alter: true }); 

await Reseña.sync({ alter: true });


await Departamento.sync({ alter: true });


await setupRelationships();
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
await seedDepartamentos();

console.log("bd actualizada");