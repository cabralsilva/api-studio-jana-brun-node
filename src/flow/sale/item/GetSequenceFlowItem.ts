import { MatriculationRepository, MatriculationSearchOLD } from "../../../model/schema/IMatriculation";
import { SaleSearch } from "../../../model/schema/ISale";
import StringUtils from "../../../utils/StringUtils";

class GetSequenceFlowItem {

  async get(offset: number = 0) {
    var sequence = StringUtils.padToLeft("0", 6, 1)
    
    var count = await new SaleSearch({
        orderBy: "sequence _id",
        order: "desc",
        page: 1,
        limit: 1
      }).count(MatriculationRepository)
    
    sequence = StringUtils.padToLeft("0", 6, (Number(count) + 1 + offset))
    
    return sequence
  }
}

export default new GetSequenceFlowItem
