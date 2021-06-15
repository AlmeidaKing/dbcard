import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { MongoUsersRepository } from "../../repositories/implementation/MongoUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(mongoUsersRepository, mailtrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }