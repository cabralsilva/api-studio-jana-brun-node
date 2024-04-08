import { MongoServerError } from 'mongodb'
import HttpError from './HttpError'
import { getMessage } from '../config/i18n'

class FlowHttp {

  processError(error) {
    console.error(error)

    if (error instanceof HttpError) {
      throw error
    }

    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        throw new HttpError(409, getMessage("response.duplicate"), error.keyValue)
      }
    }

    if (error.errors) {
      throw new HttpError(422, getMessage("response.invalidValues"), error.errors)
    }

    throw new HttpError(500, error.message, error)
  }
}

export default FlowHttp