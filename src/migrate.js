import { Sequelize } from "sequelize"
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

//Generar BD

await User.sync({ force: false });
await Veterinario.sync({ force: false });
await Animal.sync({ force: false });
await Responsable.sync({ force: false });  
await ExamenObjetivo.sync({ force: false }); 
await FichaClinica.sync({ force: false }); 
await HistoriaClinica.sync({ force: false }); 
await RegistroParametros.sync({ force: false }); 
await Tratamiento.sync({ force: false }); 

setupRelationships();

console.log("bd actualizada");