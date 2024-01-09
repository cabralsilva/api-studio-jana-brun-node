import mongoose from "mongoose"
import { PersonSearch } from "../../../model/schema/Person"
import { IStudent, StudentSearch } from "../../../model/schema/IStudent"
import Utils from "../../../utils/Utils"
import FindBySearchFlowItem from "../../person/item/FindBySearchFlowItem"
import FindStudentBySearchFlowItem from "../../student/item/FindBySearchFlowItem"

class PrepareSearchStudentFlowItem {
  async prepare(req: any) {
    if (Utils.isNotEmpty(req.query.searchText)) {
      const people = await FindBySearchFlowItem.find(new PersonSearch({ searchText: req.query.searchText }))
      var paramPerson = ''
      people.items.forEach((element: any) => {
        paramPerson += `${element._id} `
      })
      var paramStudent = ''
      
      const students = await FindStudentBySearchFlowItem.find(new StudentSearch({person: paramPerson, responsible: paramPerson}))
      students.items.forEach((element: any) => {
        paramStudent += `${element._id} `
      })
      if (Utils.isEmpty(req.query.student)) {
        req.query.student = ''
      }
      req.query.student += ' ' + paramStudent
    }
  }
}

export default new PrepareSearchStudentFlowItem