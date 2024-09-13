import { Sequelize } from "sequelize"
import setupRelationships from './relationships.js';
import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';

//Generar BD

await User.sync({ force: false });
await Veterinario.sync({ force: false });

setupRelationships();

console.log("bd actualizada");