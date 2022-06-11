import mongoose from 'mongoose';

export class MongoConnection {
  private mongooseConn;

  constructor() {
    this.connectToDB();
  }

  async connectToDB() {
    this.mongooseConn = await mongoose.connect('mongodb://localhost/dbcard-database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    this.mongooseConn.Promise = global.Promise;
  }
}