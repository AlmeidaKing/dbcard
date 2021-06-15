import { MongoUsersRepository } from '../../repositories/implementation/MongoUsersRepository';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const mongoUsersRepository = new MongoUsersRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(mongoUsersRepository);

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserUseCase, authenticateUserController }