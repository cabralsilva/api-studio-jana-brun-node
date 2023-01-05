import moment = require('moment')
import * as mongoose from 'mongoose'
import Often from '../enum/Often'
import Search from '../Search'

const ScheduleDetailModel = {
  beginDate: { type: Date, required: true },
  beginTime: { type: String, required: true, set: (value: Date) => { return moment(value).format('HH:mm') } },
  duration: { type: String, required: true, set: (value: Date) => { return moment(value).format('HH:mm') } },
  often: { type: String, enum: Object.keys(Often), required: true, default: 'WEEKLY' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule', required: true },
  active: { type: Boolean, required: true, default: true }
}

const ScheduleDetail = new mongoose.Schema(ScheduleDetailModel)

class ScheduleDetailSearch extends Search {
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
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
            $or: []
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

const ScheduleDetailRepository = mongoose.model('scheduleDetail', ScheduleDetail)

export { ScheduleDetail, ScheduleDetailModel, ScheduleDetailRepository, ScheduleDetailSearch }

