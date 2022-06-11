import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IDeleteUser } from './DeleteUserDTO';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(data: IDeleteUser) {
    const { email } = data;

    const userDeleted = await this.usersRepository.deleteUser(email);

    if (!userDeleted) throw new Error('User not found');

    return { user: userDeleted };
  }
}
