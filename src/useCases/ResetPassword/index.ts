import { mongoDb } from "../../repositories/implementation/UserRepo";
import { ResetPasswordController } from "./ResetPasswordController";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

const resetPasswordUseCase = new ResetPasswordUseCase(mongoDb);
const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase
);

export { resetPasswordUseCase, resetPasswordController };
