import * as mongoose from 'mongoose'
import Search from '../Search'
import { ISkuItem, SkuItemModel } from './SkuItem'

export interface IClassSkuItem extends ISkuItem {
  clazz: mongoose.Types.ObjectId
}

const ClassSkuItemModel = {
  clazz: { type: mongoose.Schema.Types.ObjectId, ref: 'class' },
  ...SkuItemModel
}

const ClassSkuItemScheme = new mongoose.Schema(
  ClassSkuItemModel
)

class ClassSkuItemSearch extends Search {
  name: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.active = _query.active
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (value) {
        let condition = {}
        if (key === 'searchText' as any) {
          this.searchText = this.diacriticSensitiveRegex(this.searchText)
          condition = {
            $or: [
              { 'student.person.name': { $regex: this.searchText as any, $options: 'i' } },
              { 'student.responsible.name': { $regex: this.searchText as any, $options: 'i' } },
            ]
          }
        } else {
          condition[key] = value
        }
        filters.$and.push(condition)
      }
    })
    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const ClassSkuItemRepository = mongoose.model('classSkuItem', ClassSkuItemScheme)

export { ClassSkuItemScheme, ClassSkuItemModel, ClassSkuItemRepository, ClassSkuItemSearch }

