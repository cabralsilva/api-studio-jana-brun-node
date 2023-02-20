import mongoose from "mongoose"
import { MatriculationSearch } from "../../../model/schema/Matriculation"
import CountMatriculationBySearchFlowItem from "../../matriculation/item/CountMatriculationBySearchFlowItem"

class GetCurrentRulePaymentFlowItem {
  async get(clazz: any, rolesOfEmployee: any, quantityMatriculation: number) {
    
    for (var rule of rolesOfEmployee) {
      if (quantityMatriculation >= (rolesOfEmployee.sinceStudentNumber || 1)) {
        if (quantityMatriculation <= (rolesOfEmployee.untilStudentNumber || 999)) {
          return rule
        }
      }
    }

    return null
  }
}

export default new GetCurrentRulePaymentFlowItem