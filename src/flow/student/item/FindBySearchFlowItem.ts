import mongoose from "mongoose";
import { StudentRepository, StudentSearch } from "../../../model/schema/Student";

class FindByFilterFlowItem {
  async find(search: StudentSearch) {

    if (search.isPageable()) {
      return await search.findPageable(StudentRepository)
    }
''
    return await search.findNoPageable(StudentRepository)
  }
}

export default new FindByFilterFlowItem
