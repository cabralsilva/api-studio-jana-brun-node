import * as mongoose from 'mongoose'
import { dbUrl, modeDebug } from './Configs'

class Database {
  createConnection() {
    mongoose.set("strictQuery", true);
    mongoose.connect(dbUrl)

    mongoose.set('debug', modeDebug === 'true')
  }
}

export default Database