import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider, 
  ) {}
  
  async execute(data: ICreateUserRequestDTO) {
    const { email } = data;
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User(data);
    
    const userCreatedAndAuthenticate = await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name
      },
      from: {
        email: 'teste@dbcard.com',
        name: 'DB CARD',
      },
      subject: 'Seja bem-vindo!',
      body: `Olá, ${data.name}. Obrigador por criar sua conta!`
    })

    return userCreatedAndAuthenticate;
  }
}