import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IResetPasswordDTO } from './ResetPasswordDTO';

export class ResetPasswordUseCase {
  constructor(private userRepository: IUsersRepository) {}
  async execute(data: IResetPasswordDTO) {
    const { email, password, token } = data;

    const userFound = await this.userRepository.findByEmail(email);

    if (!userFound) throw new Error('User not found');
    if (userFound.passwordResetToken !== token)
      throw new Error('Token invalid');
    if (new Date() > userFound.passwordResetExpires)
      throw new Error('Token expired');

    const newUser = await this.userRepository.resetPassword(userFound.id, password);

    return { user: newUser };
  }
}
