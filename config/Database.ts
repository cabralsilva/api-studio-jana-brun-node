import * as mongoose from 'mongoose'
import { dbUrl } from './Configs'

class Database {
  createConnection() {
    mongoose.connect(dbUrl)
  }
}

export default Database