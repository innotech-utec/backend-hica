import { Sequelize } from "sequelize"
import setupRelationships from './relationships.js';
import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';
import { Responsable } from './Responsables/Models/Responsable.js';
import { Animal } from './Animales/Models/Animal.js';

//Generar BD

await User.sync({ force: false });
await Veterinario.sync({ force: false });
await Animal.sync({ force: false });
await Responsable.sync({ force: false });  

setupRelationships();

console.log("bd actualizada");