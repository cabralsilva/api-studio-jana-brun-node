import * as HttpStatus from "http-status"
import HttpError from "../../../../model/HttpError"
import StringUtils from "../../../../utils/StringUtils"
import Utils from "../../../../utils/Utils"

class ValidateDeleteFlowItem {
  async validate(id: string) {
    var occurences = [] as any
    // const search = { paymentCondition: id }
    // var searchProducts = await FindBySearchProductFlowItem.find(new ProductSearch(search))
    // if (searchProducts.items.length > 0) {
    //   occurences = AddOccurrenceOnDeleteFlowItem.add(occurences, StringUtils.message("message.product"), searchProducts.items, "description")
    // }

    if (Utils.isNotEmpty(occurences)) {
      throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.deleteNotAllowed"), occurences)
    }
  }
}

export default new ValidateDeleteFlowItem