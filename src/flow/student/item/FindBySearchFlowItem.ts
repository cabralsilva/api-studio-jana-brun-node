import mongoose from "mongoose";
import { StudentRepository, StudentSearch, StudentSearchOLD } from "../../../model/schema/IStudent";

class FindByFilterFlowItem {
  async find(search: StudentSearchOLD) {

    if (search.isPageable()) {
      return await search.findPageable(StudentRepository)
    }
''
    return await search.findNoPageable(StudentRepository)
  }
}

export default new FindByFilterFlowItem
