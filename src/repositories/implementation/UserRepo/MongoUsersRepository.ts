import { User } from "../../../entities/User";
import { UserAuthenticated } from "../../../entities/UserAuthenticated";
import { IUsersRepository } from "../../IUsersRepository";

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'

import authConfig from '../../../config/auth.json';

export class MongoUsersRepository implements IUsersRepository {
  private mongooseConn;
  private user;

  constructor() {
    this.connectToUserRepo();
  }

  async connectToUserRepo() {
    this.mongooseConn = await mongoose.connect("mongodb://localhost/dbcard-database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    this.mongooseConn.Promise = global.Promise;

    await this.setSchema();
  }

  async setSchema() {
    const UserSchema: Schema = new Schema({
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
        select: false
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    });

    this.user = this.mongooseConn.model('User', UserSchema);
  }

  async findByEmail(email: string, isAuthMethod?: boolean): Promise<User> {
    if (isAuthMethod) {
      const userWithPassword = await this.user.findOne({ email }, { _id: 0 }).select('+password');
      return userWithPassword;
    }
    // Select para incluir o campo password
    // const bdUser = await this.user.findOne({ email }).select('+password');
    const bdUser = await this.user.findOne({ email });
    console.log('[bdUser', bdUser)
    return bdUser;
  };

  async save(user: User): Promise<UserAuthenticated> {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    
    const userCreated: User = await this.user.create(user).select('-_id');

    if (userCreated) {
      const token = jwt.sign({ id: userCreated.id }, authConfig.secret, { expiresIn: 86400 });
      const userAuthenticated: UserAuthenticated = new UserAuthenticated({ user: userCreated, token})
      
      return userAuthenticated;
    }
  }
}