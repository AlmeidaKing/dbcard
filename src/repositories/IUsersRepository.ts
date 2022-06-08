import { User } from "../entities/User";
export interface IUsersRepository {
  findByEmail(email: string, isAuthMethod?: boolean): Promise<User>;
  save(user: User): Promise<any>;
  updateForgotPassword(
    id: string,
    resetToken: string,
    resetExpires: Date
  ): Promise<any>;
  resetPassword(id: string, password: string): Promise<User>;
  deleteUser(email: string): Promise<any>;
}
