import * as mongoose from 'mongoose'
import { dbUrl } from './Configs'

class Database {
  createConnection() {
    mongoose.set("strictQuery", true);
    mongoose.connect(dbUrl)
  }
}

export default Database