import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}
  async handle(request: Request, response: Response) {
    const { email, password, token } = request.body;
    try {
      const user = await this.resetPasswordUseCase.execute({
        email,
        password,
        token,
      });

      return response.status(200).json({ message: "User updated", ...user });
    } catch (err) {
        return response.status(400).json({
            message: err.message || "User not updated"
        })
    }
  }
}
