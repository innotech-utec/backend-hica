import { User } from '../Models/User.js';

export const updateController = async (request, response) => {
    const userId = request.params.id;

    const user = await User.findByPk(userId);

    const { email, name } = request.body;

    user.email = email;
    user.name = name;
    user.save();

    return response.status(200).json(user);
}