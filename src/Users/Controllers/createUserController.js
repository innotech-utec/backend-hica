import { User } from '../Models/User.js';
import { PasswordService } from '../../Auth/Services/PasswordService.js';

export const createUserController = async (request, response) => {

    const { name, password, email } = request.body;

    if(!email) {
        return response.status(401).json({ message: 'El correo electrónico no puede estar vacío' });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
        return response.status(401).json({ message: 'El correo electrónico ingresado es inválido.' });
    }

    if(!name) {
        return response.status(401).json({ message: 'El campo nombre no debe estar vacío.' });
    }

    if(!password) {
        return response.status(401).json({ message: 'La contraseña no puede estar vacía.' });
    }

    const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        return response.status(401).json({ message: 'Por favor, ingrese una contraseña más segura' });
    }

    const user = await User.create({
        name: name,
        password: await PasswordService.encrypt(password),
        email: email
    });

    return response.set(201).json({});
}