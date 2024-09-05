import jwt from 'jsonwebtoken';
import { env } from '../../Shared/env.js';

export class TokenService {

    static isValid(token) {
        if (!token) {
            return false;
        }

        try {
            const result = jwt.verify(token, env('JWT_SECRET_KEY'));
        } catch (error) {
            return false;
        }

        return true;
    }

}