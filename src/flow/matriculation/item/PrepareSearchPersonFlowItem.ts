import { CrudFlow } from "c2-mongoose"
import { IPerson, PersonRepository, PersonSearch, PersonSearchOLD } from "../../../model/schema/IPerson"
import { IStudent, StudentRepository, StudentSearch, StudentSearchOLD } from "../../../model/schema/IStudent"
import Utils from "../../../utils/Utils"
import FindBySearchFlowItem from "../../person/item/FindBySearchFlowItem"
import FindStudentBySearchFlowItem from "../../student/item/FindBySearchFlowItem"

class PrepareSearchStudentFlowItem {

  private searcherStudent = new CrudFlow<IStudent>(StudentRepository)
  private searcherPerson = new CrudFlow<IPerson>(PersonRepository)

  async prepare(search: any) {
    if (Utils.isNotEmpty(search.searchText)) {
      this.searcherPerson.prepareSearch(new PersonSearch({
        searchText: search.searchText,
        pageable: false
      }))
      const peoples = await this.searcherPerson.find({})
      var paramPerson = []
      peoples.items.forEach((element: any) => {
        paramPerson.push(element._id)
      })
  
      this.searcherStudent.prepareSearch(new StudentSearch({
        onlyMetadata: true,
      }))
      const students = await this.searcherStudent.find({
        metadata: [
          {
            id: "items",
            conditions: [
              {
                $match: {
                  $or: [
                    {
                      person: {
                        $in: paramPerson
                      }
                    },
                    {
                      responsible: {
                        $in: paramPerson
                      }
                    },
                  ]
                }
              }
          ]
          }
        ]
      })
      var paramStudent = []
      students.items.forEach((element: any) => {
        paramStudent.push(element._id)
      })
  
      search.student = paramStudent
      search.searchText = undefined
    }
  }

}

export default new PrepareSearchStudentFlowItem