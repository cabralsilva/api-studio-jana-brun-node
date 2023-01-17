import Utils from "../../../utils/Utils"

class GetPriceFlowItem {
  get(searcherPrice: any, priceTable: any): any {
    let itemsOfPriceOfProduct = priceTable.items.filter((item: any) => item.product._id == searcherPrice.product._id)
    let response = null
    let score = 0
    for (var itemPrice of itemsOfPriceOfProduct) {
      let minScoreToCurrentItemPrice = itemPrice.gratesItems.length
      var itemsPriceIntersection = itemPrice.gratesItems.filter(n => searcherPrice.grateItemList.some(n2 => n._id == n2._id));
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
