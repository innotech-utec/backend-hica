import express from 'express';
import { loginController } from './Auth/Controllers/loginController.js';
import { verifyTokenController } from './Auth/Controllers/verifyTokenController.js';
import { token } from './Auth/Middlewares/token.js';
//*********_Usuarios_*********
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { deleteController } from './Users/Controllers/deleteController.js';
import { showController } from './Users/Controllers/showController.js';
import { updateController } from './Users/Controllers/updateController.js';


const router = express.Router()

router.post('/api/v1/login', loginController);
router.get('/api/v1/token/verify', verifyTokenController);

//*********_Usuarios_*********
router.get('/api/v1/usuarios', token, indexUserController);
router.post('/api/v1/usuarios', token, createUserController);
router.delete('/api/v1/usuarios/:id', token, deleteController);
router.get('/api/v1/usuarios/:id', token, showController);
router.patch('/api/v1/usuarios/:id', token, updateController);

export { router };