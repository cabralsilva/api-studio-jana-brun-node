import mongoose from "mongoose";
import { SupplierRepository, SupplierSearch } from "../../../model/schema/Supplier";

class FindByFilterFlowItem {
  async find(search: SupplierSearch) {

    if (search.isPageable()) {
      return await search.findPageable(SupplierRepository)
    }
''
    return await search.findNoPageable(SupplierRepository)
  }
}

export default new FindByFilterFlowItem
