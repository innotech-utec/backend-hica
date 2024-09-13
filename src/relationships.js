import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';

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

}