import { mongoDb } from '../../repositories/implementation/UserRepo';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const deleteUserUseCase = new DeleteUserUseCase(mongoDb);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController, deleteUserUseCase };
