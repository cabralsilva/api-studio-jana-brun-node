import { CrudFlow } from "c2-mongoose";
import { MatriculationRepository, MatriculationSearchOLD } from "../../../model/schema/IMatriculation";
import { ISale, SaleRepository, SaleSearch } from "../../../model/schema/ISale";
import StringUtils from "../../../utils/StringUtils";

class GetSequenceFlowItem {

  private searcherSale = new CrudFlow<ISale>(SaleRepository)

  async get(offset: number = 0) {
    var sequence = StringUtils.padToLeft("0", 6, 1)
    
    this.searcherSale.prepareSearch(new SaleSearch({
      orderBy: "sequence",
      orderSense: "desc",
      limit: 1,
    }))
    const search = await this.searcherSale.find({})
    const last = search.items[0]
    sequence = StringUtils.padToLeft("0", 6, (Number(last?.sequence ?? 0) + 1 + offset))
    
    return sequence
  }
}

export default new GetSequenceFlowItem
