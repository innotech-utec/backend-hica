import {User} from '../src/Users/Models/User.js';
import { PasswordService } from '../src/Auth/Services/PasswordService.js';

async function createTestUsers() {
    // Asegúrate de sincronizar el modelo con la base de datos
    await User.sync({ force: true }); // Usa { force: true } para crear la tabla, eliminando si ya existe

    const users = [
        { name: 'Test User 1', email: 'testuser1@example.com', password: 'password123' },
        { name: 'Test User 2', email: 'testuser2@example.com', password: 'password456' },
    ];

    for (const user of users) {
        const hashedPassword = await PasswordService.encrypt(user.password);
        await User.create({
            name: user.name,
            email: user.email,
            password: hashedPassword,
        });
    }

    console.log('Usuarios de prueba creados exitosamente.');
}

createTestUsers().catch(console.error);
