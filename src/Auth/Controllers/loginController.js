import { PasswordService } from "../Services/PasswordService.js";
import { User } from "../../Users/Models/User.js";
import jwt from "jsonwebtoken";
import { env } from "../../Shared/env.js";

export const loginController = async (request, response) => {
    const { email, password } = request.body;
    
    const user = await User.findOne({
        where: { email: email }
    })
    
    if(!user) {
        return response.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const userExist = await PasswordService.check(password, user.password);

    if (!userExist) {
        return response.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user.id }, env('JWT_SECRET_KEY'), { expiresIn: '1h' });

    const jsonResponse = {
        message: 'Usuario logueado correctamente',
        data: {
            token,
            user
        }
    };

    return response.json(jsonResponse);
}