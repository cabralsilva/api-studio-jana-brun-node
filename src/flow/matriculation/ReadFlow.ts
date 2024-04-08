import { SearcherFlow } from 'c2-mongoose'
import * as HttpStatus from 'http-status'
import { getMessage } from "../../config/i18n"
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { IMatriculation, MatriculationRepository } from '../../model/schema/IMatriculation'
import Utils from '../../utils/Utils'
import EnrichSearchResponseFlowItem from '../item/EnrichSearchResponseFlowItem'
import AdjustGrateItemFlowItem from './item/AdjustGrateItemFlowItem'
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import PrepareSearchPersonFlowItem from './item/PrepareSearchPersonFlowItem'

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const matriculation = await GetByIdFlowItem.get(req.params.id,
          [
            {
              path: 'student',
              populate: {
                path: 'responsible',
                populate: {
                  path: 'address',
                  populate: {
                    path: 'city',
                    populate: {
                      path: 'state'
                    }
                  }
                }
              }
            },
            {
              path: 'student',
              populate: {
                path: 'person'
              }
            },
            {
              path: 'clazzesSkus',
              populate: {
                path: 'clazz'
              }
            },
            {
              path: 'clazzesSkus',
              populate: {
                path: 'product',
                populate: {
                  path: 'grates'
                }
              }
            },
            {
              path: 'paymentConditionClasses'
            },
            {
              path: 'paymentConditionExtra'
            },
            {
              path: 'extraSkus',
              populate: {
                path: 'product',
                populate: {
                  path: 'grates'
                }
              }
            }
          ])

        if (Utils.isEmpty(matriculation)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }

        matriculation._doc.clazzesSkus.forEach((classSku, index) => {
          let newArrayGrateItems = AdjustGrateItemFlowItem.adjust(classSku)
          matriculation._doc.clazzesSkus[index]._doc.gratesItems = newArrayGrateItems
        })
        matriculation._doc.extraSkus.forEach((extraSku, index) => {
          let newArrayGrateItems = AdjustGrateItemFlowItem.adjust(extraSku)
          matriculation._doc.extraSkus[index]._doc.gratesItems = newArrayGrateItems
        })
        return matriculation
      }

      const search = { ...req.query }
      await PrepareSearchPersonFlowItem.prepare(search)

      const searcher = new SearcherFlow<IMatriculation>(MatriculationRepository)
      searcher.prepareSearch({ ...search })
      var response = await searcher.search({})

      return EnrichSearchResponseFlowItem.enrich2(response)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
