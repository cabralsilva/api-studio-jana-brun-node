import { MatriculationRepository, MatriculationSearchOLD } from "../../../model/schema/IMatriculation";
import StringUtils from "../../../utils/StringUtils";

class GetSequenceFlowItem {
  async get(offset: number = 0) {
    var sequence = StringUtils.padToLeft("0", 6, 1)
    
    var count = await new MatriculationSearchOLD({
        orderBy: "created_at",
        order: "desc",
        page: 1,
        limit: 1
      }).count(MatriculationRepository)
    
    sequence = StringUtils.padToLeft("0", 6, (Number(count) + 1 + offset))
    
    return sequence
  }
}

export default new GetSequenceFlowItem
