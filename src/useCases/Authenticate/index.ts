import { mongoDb } from '../../repositories/implementation/UserRepo';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const mongoUsersRepository = mongoDb;

const authenticateUserUseCase = new AuthenticateUserUseCase(mongoUsersRepository);

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserUseCase, authenticateUserController }