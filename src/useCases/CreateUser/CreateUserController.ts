import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUsersUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      if (name && email && password) {
        const userCreatedAndAuthenticate = await this.createUsersUseCase.execute({
          name,
          email,
          password,
        });

        return response.status(201).json({
          message: "User created sucessfully.",
          ...userCreatedAndAuthenticate
        });
      }

      return response.status(400).json({
        message: "Missing properties..."
      })
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
