import { CrudFlow } from "c2-mongoose"
import Utils from "../../../utils/Utils"
import { GrateRepository, GrateSearch } from "../../../model/schema/IGrate"

class GetPriceFlowItem {
  private crudGrates = new CrudFlow<any>(GrateRepository)
 
  async get(searcherPrice: any, priceTable: any): Promise<any> {
    let itemsOfPriceOfProduct = priceTable.items.filter((item: any) => item.product?._id == searcherPrice.product._id) as any[]
    let response = null
    let score = 0

    this.crudGrates.prepareSearch(new GrateSearch({
      "items._id": itemsOfPriceOfProduct.flatMap((itemPrice: any) => itemPrice.gratesItems).map((grateItem: any) => grateItem)
    }))
    const grates = await this.crudGrates.find({})
    for (var itemPrice of itemsOfPriceOfProduct) {
      let minScoreToCurrentItemPrice = grates.items.length
      var itemsPriceIntersection = itemPrice.gratesItems.filter(n => searcherPrice.gratesItems.some(n2 => n._id == n2.grateItem));
      if (itemsPriceIntersection.length >= minScoreToCurrentItemPrice && itemsPriceIntersection.length >= score) {
        response = itemPrice
        score = itemsPriceIntersection.length
        continue
      }

      if (Utils.isEmpty(itemsPriceIntersection) && minScoreToCurrentItemPrice == 0 && score == 0) {
        response = itemPrice;
        score = minScoreToCurrentItemPrice;
      }
    }

    return response
  }
}

export default new GetPriceFlowItem
