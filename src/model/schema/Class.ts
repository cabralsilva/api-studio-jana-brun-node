import moment = require('moment')
import * as mongoose from 'mongoose'
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
  description: { type: String }
  type: { type: String }
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

const ClassRepository = mongoose.model('class', Class)

export { Class, ClassModel, ClassRepository, ClassSearch }

