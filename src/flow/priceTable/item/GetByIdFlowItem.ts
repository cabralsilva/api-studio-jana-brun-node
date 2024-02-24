import { GrateRepository } from "../../../model/schema/IGrate"
import { PriceTableRepository } from "../../../model/schema/PriceTable"
import Utils from "../../../utils/Utils"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    const priceTable = await PriceTableRepository.findById(id).populate(pop)
      .select(sel) as any

    if (Utils.isNotEmpty(priceTable)) {
      var priceTableItems = []
      for (var priceTableItem of priceTable.items) {
        var gratesItems = []
        for (var grateItemId of priceTableItem.gratesItems) {
          var grateItemAux = await GrateRepository.find({ "items._id": grateItemId }, { 'items.$': 1 })
          if (Utils.isNotEmpty(grateItemAux)) {
            gratesItems.push(grateItemAux[0].items[0])
          }
        }
        priceTableItem._doc.gratesItems = gratesItems
      }
    }
    return priceTable
  }
}

export default new GetByIdFlowItem
