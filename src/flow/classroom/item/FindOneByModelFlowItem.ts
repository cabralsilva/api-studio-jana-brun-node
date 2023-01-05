import { ClassroomRepository } from "../../../model/schema/Classroom"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await ClassroomRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
