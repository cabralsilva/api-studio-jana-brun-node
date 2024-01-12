import * as HttpStatus from "http-status"
import mongoose from "mongoose"
import { getMessage } from "../../config/i18n"
import FlowHttp from "../../model/FlowHttp"
import HttpError from "../../model/HttpError"
import DateUtils from "../../utils/DateUtils"
import Utils from "../../utils/Utils"
import BuildFinancialsByPaymentConditionFlowItem from "../financial/financial/item/BuildFinancialsByPaymentConditionFlowItem"
import CreateFinancialFlowItem from "../financial/financial/item/CreateFinancialFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"

class GenerateExtraSkuFinancial extends FlowHttp {

  async generate(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      const matriculation = await GetByIdFlowItem.get(req.params.id, "paymentConditionExtra student")

      if (Utils.isEmpty(matriculation)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.response.resourceNotFound"))
      }

      if (matriculation.extraSkuFinancialCreated) {
        throw new HttpError(HttpStatus.PRECONDITION_FAILED, getMessage("message.response.matriculation.financialAlreadyCreated"))
      }

      const financialBase = {
        movimentDate: new Date(),
        dueDate: DateUtils.stringToDateTimeUTC0(req.body.dueDate),
        description: `MAT/EX-${matriculation.sequence}`,
        value: matriculation.extraSkus.reduce((acc, extraSku) => { return acc + extraSku.totalValue }, 0),
        type: 'RECEIPT',
        person: matriculation.student.person.toString()
      }
      const financials = await BuildFinancialsByPaymentConditionFlowItem.build(matriculation.paymentConditionExtra, financialBase)
      
      for (var financial of financials) {
        await CreateFinancialFlowItem.create(financial, session)
      }

      await UpdateFlowItem.update(matriculation._id.toString(), { extraSkuFinancialCreated: true }, session)

      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new GenerateExtraSkuFinancial
