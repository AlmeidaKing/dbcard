import { User } from "../../../entities/User";
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
      const userWithPassword = await this.user.findOne({ email }, { _id: 0 }).select('+password')

      return userWithPassword;
      }

    // Select para incluir o campo password
    // const bdUser = await this.user.findOne({ email }).select('+password');
    const bdUser = await this.user.findOne({ email });
    
    return bdUser;
  };

  async save(user: User): Promise<any> {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    
    const userCreated = await this.user.create(user);
    
    if (userCreated) {
      //  Aqui o usuário criado se torna um usuário autenticado
      //  que é devolvido ao front com o token gerado
      const token = jwt.sign({ id: userCreated.id }, authConfig.secret, { expiresIn: 86400 });

      let user = {};

      Object.keys(userCreated._doc).map(k => {
        if (k !== '_id') user[k] = userCreated[k];
      });
      
      return { user, token };
    }
  }
}