import { User } from '../entities/User';
import { LeanDocument } from 'mongoose';

export type DeleteUserResponse = {
  n?: number;
  ok?: number;
  deleteCount?: number;
};

export interface IUsersRepository {
  findByEmail(
    email: string,
    isAuthMethod?: boolean
  ): Promise<LeanDocument<User>>;
  save(user: User): Promise<{ user: User; token: string }>;
  updateForgotPassword(
    id: string,
    resetToken: string,
    resetExpires: Date
  ): Promise<LeanDocument<User>>;
  resetPassword(id: string, password: string): Promise<LeanDocument<User>>;
  deleteUser(email: string): Promise<LeanDocument<DeleteUserResponse> | null>;
}
