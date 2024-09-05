import { User } from '../Models/User.js';

export const indexUserController = async (request, response) => {

    const page = parseInt(request.query.page) || 1;

    
    response.json(await User.paginate(4, page));
}