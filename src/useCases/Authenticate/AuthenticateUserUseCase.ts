import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "./AuthenticateUserDTO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth.json';

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IAuthenticateUserDTO) {
    const { email, password } = data;
    const userFound = await this.usersRepository.findByEmail(email, true);

    
    if (!userFound) {
      throw new Error('User not found');
    }

    if (! await bcrypt.compare(password, userFound.password)) {
      throw new Error('Incorrect Password');
    }

    const token = jwt.sign({ id: userFound.id }, authConfig.secret, { expiresIn: 86400 });

    return { user: userFound, token }
  }
} 