import mongoose from "mongoose"
import { PersonSearchOLD } from "../../../../model/schema/IPerson"
import Utils from "../../../../utils/Utils"
import FindPersonBySearchFlowItem from "../../../person/item/FindBySearchFlowItem"

class PrepareSearchPersonFlowItem {
  async prepare(req: any) {
    if (Utils.isNotEmpty(req.query.searchText)) {
      const people = await FindPersonBySearchFlowItem.find(new PersonSearchOLD({ searchText: req.query.searchText }))
      req.query.person = ''
      people.items.forEach((element: any) => {
        req.query.person += `${element._id} `
      })
    }
  }
}

export default new PrepareSearchPersonFlowItem