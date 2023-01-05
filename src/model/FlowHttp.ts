import { MongoServerError } from 'mongodb'
import StringUtils from '../utils/StringUtils'
import HttpError from './HttpError'

class FlowHttp {

  processError(error) {

    if (error instanceof HttpError) {
      throw error
    }

    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        throw new HttpError(409, StringUtils.message("response.duplicate"), error.keyValue)
      }
    }

    if (error.errors) {
      throw new HttpError(422, StringUtils.message("response.invalidValues"), error.errors)
    }

    throw new HttpError(500, error.message, error)
  }
}

export default FlowHttp