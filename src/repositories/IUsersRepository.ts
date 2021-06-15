import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string, isAuthMethod?: boolean): Promise<User>;
  save(user: User): Promise<void>;
}