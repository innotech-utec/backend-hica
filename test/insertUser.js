import { sequelize } from '../src/database.js';
import { User } from '../src/Users/Models/User.js';
import { Veterinario } from '../src/Users/Models/Veterinarios.js';
import { PasswordService } from '../src/Auth/Services/PasswordService.js';

async function createTestUsers() {
    try {
        // Elimina todas las tablas en la base de datos
       // await sequelize.drop();
        //console.log('Todas las tablas han sido eliminadas.');

        // Asegúrate de sincronizar los modelos con la base de datos
       // await User.sync({ force: true });  // Elimina y recrea la tabla User
       // await Veterinario.sync({ force: true });  // Elimina y recrea la tabla Veterinario

        // Crear un usuario admin (que no es veterinario)
        const adminUser = {
            documento: '51680176',
            nombre: 'Karen',
            apellido: 'Etchepare',
            estado: true,
            email: 'karen@hica.com',
            password: 'innotech',
            isAdmin: true
        };

        const Uservet = {
            documento: '52349867',
            nombre: 'Cecilia',
            apellido: 'Capelan',
            estado: true,
            email: 'cecilia@hica.com',
            password: 'innotech',
            isAdmin: true
        };

        // Crear usuarios veterinarios
        const datos_vet = 
            {
                N_de_registro: 1234567890,
                Validado: true,
                Dependencia: 'Hospital A',
                Foto: null,
                deviceId: 'device-id-1'
            }

        // Crear el usuario admin
        const hashedAdminPassword = await PasswordService.encrypt(adminUser.password);
        const karen = await User.create({
            documento: adminUser.documento,
            nombre: adminUser.nombre,
            apellido: adminUser.apellido,
            estado: adminUser.estado,
            email: adminUser.email,
            password: hashedAdminPassword,
            isAdmin: adminUser.isAdmin
        });

        // Crear el usuario para vet
        const hashedVetPassword = await PasswordService.encrypt(Uservet.password);
        const cecilia = await User.create({
            documento: Uservet.documento,
            nombre: Uservet.nombre,
            apellido: Uservet.apellido,
            estado: Uservet.estado,
            email: Uservet.email,
            password: hashedVetPassword,
            isAdmin: Uservet.isAdmin
        });

        console.log('Usuario Vet creado exitosamente.');

        // Agrega registro veterinario

        const vet = await Veterinario.create({
            N_de_registro: datos_vet.N_de_registro,
            Validado: datos_vet.Validado,
            deviceId: datos_vet.deviceId,
            Dependencia: datos_vet.Dependencia,
            Foto: datos_vet.Foto,
            userId: karen.id
        })
        
        

        console.log('Usuario veterinario creado exitosamente.');

        const vets = await Veterinario.findAll();
        console.log(vets);
    } catch (error) {
        console.error('Error al crear usuarios de prueba:', error);
    }
}

createTestUsers().catch(console.error);
