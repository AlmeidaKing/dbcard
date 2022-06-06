import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ForgotPasswordDTO } from "./ForgotPasswordDTO";
import crypto from "crypto";

export class ForgotPasswordUseCase {
  constructor(private userRepository: IUsersRepository) {}
  async execute(data: ForgotPasswordDTO) {
    const { email } = data;

    const userFound = await this.userRepository.findByEmail(email);

    if (!userFound) {
      throw new Error("User not found");
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const userWithForgotPassword =
      await this.userRepository.updateForgotPassword(
        userFound.id,
        resetPasswordToken,
        now
      );

    return { user: userWithForgotPassword };
  }
}
