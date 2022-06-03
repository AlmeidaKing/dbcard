import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ForgotPasswordDTO } from "./ForgotPasswordDTO";

export class ForgotPasswordUseCase {
  constructor(private userRepository: IUsersRepository) {}
  async execute(data: ForgotPasswordDTO) {
    const { email } = data;

    if (!email) {
      throw new Error('Missing email');
    }

    const userFound = this.userRepository.findByEmail(email);
    
    return userFound;
  }
}
