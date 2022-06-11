import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { mongoDb } from '../../repositories/implementation/UserRepo';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mongoUsersRepository = mongoDb;
const mailtrapMailProvider = new MailtrapMailProvider();

// const createUserUseCase = new CreateUserUseCase(mongoUsersRepository, mailtrapMailProvider);
const createUserUseCase = new CreateUserUseCase(mongoUsersRepository, mailtrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };