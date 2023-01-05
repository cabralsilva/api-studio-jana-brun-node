import { StudentRepository } from "../../../model/schema/Student"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await StudentRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
