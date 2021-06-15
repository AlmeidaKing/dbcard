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
    await this.usersRepository.save(user);

    // this.mailProvider.sendMail({
    //   to: {
    //     email: data.email,
    //     name: data.name
    //   },
    //   from: {
    //     email: 'Teste Email',
    //     name: 'teste@teste.com',
    //   },
    //   subject: 'TESTE ASSUNTO',
    //   body: 'nation zoo entirely chain tune clock friend wash pool top touch sell surprise oldest religious swim play ask curious studying fire coming drop torn'
    // })
  }
}