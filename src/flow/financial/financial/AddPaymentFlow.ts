import * as HttpStatus from 'http-status'
import mongoose from "mongoose"
import FlowHttp from "../../../model/FlowHttp"
import HttpError from "../../../model/HttpError"
import StringUtils from "../../../utils/StringUtils"
import Utils from "../../../utils/Utils"
import AddPaymentFlowItem from "./item/AddPaymentFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import GetValueTotalPaidFlowItem from "./item/GetValueTotalPaidFlowItem"
import ValidatePaymentFlowItem from "./item/ValidatePaymentFlowItem"

class AddPaymentFlow extends FlowHttp {

  async add(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      var financial = await GetByIdFlowItem.get(req.params.id)
      if (Utils.isEmpty(financial)) {
        throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
      }
      ValidatePaymentFlowItem.validate(financial, req.body)
      var finacialToUpdate = {
        status: GetValueTotalPaidFlowItem.get(financial, req.body) < financial.value ? "OPENED" : "PAID"
      }

      await AddPaymentFlowItem.add(req.params.id, finacialToUpdate, req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new AddPaymentFlow
