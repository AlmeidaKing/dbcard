import mongoose, { Schema, Model, Mongoose, LeanDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// entities
import { User } from '../../../entities/User';

// interfaces
import { DeleteUserResponse, IUsersRepository } from '../../IUsersRepository';

// config
import authConfig from '../../../config/auth.json';

// utils
import { filterProps } from '../../../utils/filterProps';

export class MongoUsersRepository implements IUsersRepository {
  private mongooseConn: Mongoose;
  private user: Model<User>;

  constructor() {
    this.connectToUserRepo();
  }

  async connectToUserRepo() {
    this.mongooseConn = await mongoose.connect(
      'mongodb://localhost/dbcard-database',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    this.mongooseConn.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);

    await this.setSchema();
  }

  async setSchema() {
    const UserSchema = new Schema<User>({
      id: {
        type: String,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      passwordResetToken: {
        type: String,
        select: false,
      },
      passwordResetExpires: {
        type: Date,
        select: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    this.user = this.mongooseConn.model('User', UserSchema);
  }

  // eslint-disable-next-line
  removeMongoId(user: User): any {
    const filteredUser = filterProps(user, ['_id']);

    return filteredUser;
  }

  async findByEmail(
    email: string,
    isAuthMethod?: boolean
  ): Promise<LeanDocument<User> | null> {
    if (isAuthMethod) {
      const userWithPassword = await this.user
        .findOne({ email }, { _id: 0 })
        .select('+password')
        .lean();

      return userWithPassword;
    }

    const bdUser = await this.user
      .findOne({ email })
      .select('+passwordResetToken +passwordResetExpires')
      .lean();

    return bdUser;
  }

  async save(user: User): Promise<{ user: User; token: string }> {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const userCreated = await this.user.create(user);

    if (userCreated) {
      //  Aqui o usuário criado se torna um usuário autenticado
      //  que é devolvido ao front com o token gerado
      const token = jwt.sign({ id: userCreated.id }, authConfig.secret, {
        expiresIn: 86400,
      });

      const newUser = this.removeMongoId(userCreated);

      return newUser ? { user: newUser['_doc'], token } : null;
    }
  }

  async updateForgotPassword(
    id: string,
    resetToken: string,
    resetExpires: Date
  ): Promise<LeanDocument<User>> {
    const config = {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    };
    const findAndUpdateUser = await this.user
      .findOneAndUpdate({ id }, { ...config })
      .lean();

    const newUser = { ...findAndUpdateUser, ...config };

    return newUser;
  }

  async resetPassword(
    id: string,
    password: string
  ): Promise<LeanDocument<User> | null> {
    const hash = await bcrypt.hash(password, 10);

    const newPasswordUser = await this.user
      .findOneAndUpdate({ id }, { password: hash })
      .lean();

    return newPasswordUser;
  }

  async deleteUser(
    email: string
  ): Promise<LeanDocument<DeleteUserResponse> | null> {
    const deletedUser = await this.user.deleteOne({ email }).lean();

    return deletedUser.deletedCount ? deletedUser : null;
  }
}
