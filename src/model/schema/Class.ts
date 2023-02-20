import moment = require('moment')
import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
import Often from '../enum/Often'
import Search from '../Search'
import { RolePayment } from './RolePayment'

const ClassModel = {
  description: { type: String, required: true },
  inviteWhatsAppGroup: { type: String },
  beginDate: { type: Date, required: true },
  endDate: { type: Date },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  rolePayments: [RolePayment],
  schedulesDetails: [
    {
      classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true },
      beginTime: { type: String, required: true },
      endTime: { type: String, required: true },
      often: { type: String, enum: Object.keys(Often), required: true, default: 'WEEKLY' },
      oftenDay: { type: String, required: true }
    }
  ]
}

const Class = new mongoose.Schema(ClassModel, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

class ClassSearch extends Search {
  model: { type: typeof ClassModel }
  beginDateRange: [moment.Moment, moment.Moment]
  endDateRange: [moment.Moment, moment.Moment]
  employee: [mongoose.Types.ObjectId]

  constructor(_query) {
    super(_query)
    this.model = _query
    if (Utils.isNotEmpty(_query?.endDateRange)) {
      if (!Array.isArray(_query.endDateRange)) {
        _query.endDateRange = _query.endDateRange.toString().split(',')
      }
      this.endDateRange = _query.endDateRange.map(data => moment(data))
    }

    if (Utils.isNotEmpty(_query?.employee)) {
      if (!Array.isArray(_query.employee)) {
        _query.employee = _query.employee.toString().split(',')
      }
      this.employee = _query.employee.map(data => new mongoose.Types.ObjectId(data))
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = super.getFilters(this)
    if (Utils.isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }

    if (Utils.isNotEmpty(this.searchText)) {
      this.searchText = this.diacriticSensitiveRegex(this.searchText)
      let condition = {
        $or: [
          { 'description': { $regex: this.searchText as any, $options: 'i' } }
        ]
      }
      filters.$and.push(condition)
    }

    if (Utils.isNotEmpty(this.employee)) {
      let condition = { 'rolePayments.employee': { $in: this.employee || [] } }
      filters.$and.push(condition)
    }


    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const ClassRepository = mongoose.model('class', Class)

export { Class, ClassModel, ClassRepository, ClassSearch }

