import { MatriculationSearch, MatriculationRepository } from "../../../model/schema/Matriculation";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";
import FindBySearchFlowItem from "./FindMatriculationBySearchFlowItem";

class GetSequenceFlowItem {
  async get(offset: number = 0) {
    var sequence = StringUtils.padToLeft("0", 6, 1)
    
    var count = await new MatriculationSearch({
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
