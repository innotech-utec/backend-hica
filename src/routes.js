import express from 'express';
import { loginController } from './Auth/Controllers/loginController.js';
import { verifyTokenController } from './Auth/Controllers/verifyTokenController.js';
import { token } from './Auth/Middlewares/token.js';

// *********_Usuarios_*********
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { deleteController } from './Users/Controllers/deleteController.js';
import { showController } from './Users/Controllers/showController.js';
import { updateController } from './Users/Controllers/updateController.js';

// *********_Veterinarios_*********
import { indexVeterinarioController } from './Users/Controllers/indexVeterinarioController.js';
import { createVeterinarioController } from './Users/Controllers/createVeterinarioController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginController);
router.get('/token/verify', verifyTokenController);

// *********_Usuarios_*********
router.get('/usuarios', token, indexUserController);
router.post('/usuarios', token, createUserController);
router.delete('/usuarios/:id', token, deleteController);
router.get('/usuarios/:id', token, showController);
router.patch('/usuarios/:id', token, updateController);

// *********_Veterinarios_*********
router.get('/veterinarios', token, indexVeterinarioController);
router.post('/veterinarios', token, createVeterinarioController);

export { router };

