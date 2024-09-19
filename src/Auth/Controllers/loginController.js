import { PasswordService } from "../Services/PasswordService.js";
import { User } from "../../Users/Models/User.js";
import jwt from "jsonwebtoken";
import { env } from "../../Shared/env.js";

export const loginController = async (request, response) => {
    try {
        // Verifica si el email y el password están presentes en la solicitud
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Busca el usuario por el email
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return response.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Verifica la contraseña
        const isPasswordValid = await PasswordService.check(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Genera el token JWT
        const token = jwt.sign(
            { userId: user.id },
            env('JWT_SECRET_KEY'),  // Asegúrate de que la clave JWT está bien configurada
            { expiresIn: '1h' }
        );

        // Construye la respuesta
        const jsonResponse = {
            message: 'Usuario logueado correctamente',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    // Agrega cualquier otro campo del usuario que necesites en la respuesta, pero evita incluir la contraseña
                }
            }
        };

        // Devuelve la respuesta con el token y los datos del usuario
        return response.json(jsonResponse);
    } catch (error) {
        console.error('Error en loginController:', error);
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
};

