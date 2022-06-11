import { mongoDb } from '../../repositories/implementation/UserRepo';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';
import { ForgotPasswordController } from './ForgotPasswordController';

const forgotPasswordUseCase = new ForgotPasswordUseCase(mongoDb);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase
);

export { forgotPasswordController, forgotPasswordUseCase };
