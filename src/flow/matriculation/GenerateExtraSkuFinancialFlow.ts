import * as HttpStatus from "http-status"
import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import HttpError from "../../model/HttpError"
import StringUtils from "../../utils/StringUtils"
import Utils from "../../utils/Utils"
import BuildFinancialsByPaymentConditionFlowItem from "../financial/financial/item/BuildFinancialsByPaymentConditionFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import CreateFinancialFlowItem from "../financial/financial/item/CreateFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"
import moment = require("moment")

class GenerateExtraSkuFinancial extends FlowHttp {

  async generate(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      const matriculation = await GetByIdFlowItem.get(req.params.id, "paymentConditionExtra student")

      if (Utils.isEmpty(matriculation)) {
        throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.response.resourceNotFound"))
      }

      if (matriculation.extraSkuFinancialCreated) {
        throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.response.matriculation.financialAlreadyCreated"))
      }

      const financialBase = {
        movimentDate: new Date(),
        dueDate: req.body.dueDate,
        description: `ADDMAT-${matriculation.sequence}`,
        value: matriculation.extraSkus.reduce((acc, extraSku) => { return acc + extraSku.totalValue }, 0),
        type: 'RECEIPT',
        person: matriculation.student.responsible.toString()
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
