import * as mongoose from 'mongoose'
import TypeOfNotice from '../enum/TypeOfNotice'
import Search from '../Search'

const NoticeModel = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number, default: 1, required: true },
  type: { type: String, enum: Object.keys(TypeOfNotice), required: true, default: 'INFORMATION' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  active: { type: Boolean, required: true, default: true }
}

const Notice = new mongoose.Schema(NoticeModel)


class NoticeSearch extends Search {
  title: { type: String }
  description: { type: String }
  type: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.title = _query.title
    this.description = _query.description
    this.type = _query.type
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
              { 'title': { $regex: this.searchText as any, $options: 'i' } },
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'type': { $regex: this.searchText as any, $options: 'i' } }
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

const NoticeRepository = mongoose.model('notice', Notice)

export { Notice, NoticeModel, NoticeRepository, NoticeSearch }

