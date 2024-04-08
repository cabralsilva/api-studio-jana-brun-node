import { SearcherFlow } from 'c2-mongoose'
import * as HttpStatus from 'http-status'
import { getMessage } from '../../config/i18n'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { CityRepository } from '../../model/schema/address/City'
import Utils from '../../utils/Utils'
import EnrichSearchResponseFlowItem from '../item/EnrichSearchResponseFlowItem'
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)){
        const city = await GetByIdFlowItem.get(req.params.id);
        if (Utils.isEmpty(city)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return city
      }

      const searcher = new SearcherFlow<any>(CityRepository)
      searcher.prepareSearch({ ...req.query })
      var response = await searcher.search({})

      return EnrichSearchResponseFlowItem.enrich2(response)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
