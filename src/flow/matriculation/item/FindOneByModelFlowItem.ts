import { MatriculationRepository } from "../../../model/schema/Matriculation"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined, pop = undefined): Promise<any> {
    return await MatriculationRepository.findOne(model).populate(pop)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem