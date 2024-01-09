import { ProductRepository, ProductSearch } from "../../../model/schema/IProduct"

class FindByFilterFlowItem {
  async find(search: ProductSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(ProductRepository)
    }

    return await search.findNoPageable(ProductRepository)
  }
}

export default new FindByFilterFlowItem
