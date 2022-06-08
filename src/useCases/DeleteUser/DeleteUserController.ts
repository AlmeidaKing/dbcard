import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const user = await this.deleteUserUseCase.execute({ email });

      return response.status(200).json({
        message: "User deleted",
        user,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || "User not deleted",
      });
    }
  }
}
