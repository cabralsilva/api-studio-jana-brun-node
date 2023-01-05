import * as mongoose from 'mongoose'
import Search from '../Search'

const ScheduleModel = {
  beginDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true },
  active: { type: Boolean, required: true, default: true }
}

const Schedule = new mongoose.Schema(ScheduleModel)

class ScheduleSearch extends Search {
  description: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.description = _query.description
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
              { 'description': { $regex: this.searchText as any, $options: 'i' } }
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

const ScheduleRepository = mongoose.model('schedule', Schedule)

export { Schedule, ScheduleModel, ScheduleRepository, ScheduleSearch }

