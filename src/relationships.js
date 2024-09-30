import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';
import { Responsable } from './Responsables/Models/Responsable.js';  
import { Animal } from './Animales/Models/Animal.js'; 

// Definir relaciones

export default function setupRelationships() {

    //Cada usuario puede tener un solo registro veterinario (o ninguno)
    User.hasOne(Veterinario, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });

    //Todo veterinario debe tener asociado un usuario
    Veterinario.belongsTo(User, {
        foreignKey: 'userId'
    });

    // Un responsable puede tener muchos animales
    Responsable.hasMany(Animal, {
        foreignKey: 'responsableId',
        as: 'animales', //Alias para relaciones de animales con responsables ! ojo! 
        onDelete: 'CASCADE'
    });

    // Todo animal debe pertenecer a un responsable
    Animal.belongsTo(Responsable, {
        foreignKey: 'responsableId',
        as: 'responsable' //alias relacion de responsables con animasles
    });

}