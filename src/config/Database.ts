import { CONFLICT, NOT_ACCEPTABLE } from 'http-status';
import { MongoServerError } from 'mongodb';
import * as mongoose from 'mongoose';
import { dbUrl, modeDebug } from './Configs';
import { HttpError } from './Http';
import { getMessage } from './i18n';
import { initialize } from 'c2-mongoose';

class Database {
  async createConnection() {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUrl, { retryWrites: true, retryReads: true })
    initialize(mongoose.connections[0])
    mongoose.set('debug', modeDebug === 'true')
  }

  convertErrorToHttpError = (error: any) => {
    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        return new HttpError(CONFLICT, getMessage("message.duplicate"), error.keyValue)
      }
    }

    if (error instanceof mongoose.Error.ValidationError) {
      error = error as mongoose.Error.ValidationError

      var fields = Object.keys(error.errors)
      return new HttpError(NOT_ACCEPTABLE, getMessage("message.fieldIsRequired", fields.join(", ")), error.errors)
    }


    return error
  }
}

export default new Database