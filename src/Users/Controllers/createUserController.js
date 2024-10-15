import { User } from '../Models/User.js';
import { PasswordService } from '../../Auth/Services/PasswordService.js';

export const createUserController = async (request, response) => {

    const { nombre, password, email, documento, apellido, estado, isAdmin } = request.body;

    if (!email) {
        return response.status(401).json({ message: 'El correo electrónico no puede estar vacío' });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
        return response.status(401).json({ message: 'El correo electrónico ingresado es inválido.' });
    }

    if (!nombre) {
        return response.status(401).json({ message: 'El campo nombre no debe estar vacío.' });
    }

    if (!password) {
        return response.status(401).json({ message: 'La contraseña no puede estar vacía.' });
    }

    const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        return response.status(401).json({ message: 'Por favor, ingrese una contraseña más segura' });
    }

    const user = await User.create({
        documento,
        nombre,
        apellido,
        estado,
        email,
        password: await PasswordService.encrypt(password),
        isAdmin
    });

    // pasar la ID en la respuesta
    return response.status(201).json({
        id: user.id
    });
}
