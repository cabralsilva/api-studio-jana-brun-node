import { PersonSearchOLD } from "../../../model/schema/IPerson"
import Utils from "../../../utils/Utils"
import FindBySearchFlowItem from "../../person/item/FindBySearchFlowItem"

class PrepareEmployeeSearchTextFlowItem {
  async prepare(req: any) {
    req.query.person = ''
    if (Utils.isNotEmpty(req.query.searchText)) {
      const people = await FindBySearchFlowItem.find(new PersonSearchOLD({ searchText: req.query.searchText }))
      var paramPerson = ''
      people.items.forEach((element: any) => {
        console.log(element)
        paramPerson += `${element._id} `
      })
      
      req.query.person += paramPerson
    }
  }
}

export default new PrepareEmployeeSearchTextFlowItem