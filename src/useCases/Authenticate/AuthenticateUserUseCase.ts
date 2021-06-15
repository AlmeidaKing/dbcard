import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "./AuthenticateUserDTO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IAuthenticateUserDTO) {
    const { email, password } = data;
    const userFound = await this.usersRepository.findByEmail(email, true);

    if (!userFound) {
      throw new Error('User not found');
    }

    if (! await bcrypt.compare(password, userFound.password)) {
      throw new Error('Incorrect Password');
    }

    const token = jwt.sign({ id: userFound.id }, '9db4965ed71f81402b9f340d8a24b5c6', { expiresIn: 86400 });

    return { user: userFound, token }
  }
} 