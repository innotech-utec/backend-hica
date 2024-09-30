import express from 'express';
import { loginController } from './Auth/Controllers/loginController.js';
import { verifyTokenController } from './Auth/Controllers/verifyTokenController.js';
import { token } from './Auth/Middlewares/token.js';

// Controladores de usuarios y responsables
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { deleteController } from './Users/Controllers/deleteController.js';
import { showController } from './Users/Controllers/showController.js';
import { updateController } from './Users/Controllers/updateController.js';
import { indexResponsableController } from './Responsables/Controllers/indexResponsableController.js';
import { createResponsableController } from './Responsables/Controllers/createResponsableController.js';
import { showResponsableController } from './Responsables/Controllers/showResponsableController.js';


import { createAnimalController } from './Animales/Controllers/createAnimalController.js';
import { indexAnimalController } from './Animales/Controllers/indexAnimalController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginController);
router.get('/token/verify', verifyTokenController);

// Rutas de usuarios
router.get('/usuarios', token, indexUserController);
router.post('/usuarios', token, createUserController);
router.delete('/usuarios/:id', token, deleteController);
router.get('/usuarios/:id', token, showController);
router.patch('/usuarios/:id', token, updateController);

// Rutas de responsables
router.get('/responsables', token, indexResponsableController); 
router.post('/responsables', token, createResponsableController); 
router.get('/responsables/:id', token, showResponsableController); // Obtener responsable por ID


//rutas animales

router.get('/animales', token, indexAnimalController); 
router.post('/animales', token, createAnimalController);


export { router };
