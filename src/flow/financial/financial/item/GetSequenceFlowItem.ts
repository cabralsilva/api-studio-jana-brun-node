import { FinancialSearchOLD } from "../../../../model/schema/Financial";
import StringUtils from "../../../../utils/StringUtils";
import Utils from "../../../../utils/Utils";
import FindBySearchFlowItem from "./FindBySearchFlowItem";

class GetSequenceFlowItem {
  async get(financial: any, offset: number = 0) {
    var sequence = StringUtils.padToLeft("0", 6, 1)
    var historicalCompany = await FindBySearchFlowItem.find(new FinancialSearchOLD({
      orderBy: "created_at",
      order: "desc",
      page: 1,
      limit: 1
    })) as any

    if (Utils.isIterable(historicalCompany.items) && Utils.isNotEmpty(historicalCompany.items[0])) {
      sequence = StringUtils.padToLeft("0", 6, (Number(historicalCompany.items[0].sequence) + 1 + offset))
    }else{
      sequence = StringUtils.padToLeft("0", 6, (Number(sequence) + offset))
    }

    return sequence
  }
}

export default new GetSequenceFlowItem
