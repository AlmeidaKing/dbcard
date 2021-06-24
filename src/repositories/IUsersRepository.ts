import { User } from "../entities/User";
import { UserAuthenticated } from "../entities/UserAuthenticated";
export interface IUsersRepository {
  findByEmail(email: string, isAuthMethod?: boolean): Promise<User>;
  save(user: User): Promise<UserAuthenticated>;
}