import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { MatriculationSearchOLD } from '../../model/schema/IMatriculation'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import AdjustGrateItemFlowItem from './item/AdjustGrateItemFlowItem'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindMatriculationBySearchFlowItem"
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
      var resultSearch = await FindBySearchFlowItem.find(new MatriculationSearchOLD(search)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      console.log(error)
      this.processError(error)
    }
  }
}
export default new ReadFlow
