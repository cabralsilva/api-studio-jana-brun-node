import * as mongoose from 'mongoose'
import StatusOfMatriculation from '../enum/StatusOfMatriculation'
import Search from '../Search'
import { ClassSkuItemScheme } from './ClassSkuItem'
import { SkuItemModel } from './SkuItem'

const MatriculationModel = {
  sequence: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  responsibleFinancial: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  effectiveDateTime: { type: Date },
  dayOfMonthToPayment: { type: Number },
  observation: { type: String },
  status: { type: String, enum: Object.keys(StatusOfMatriculation), required: true, default: 'PRE_REGISTER' },
  clazzesSkus: [ClassSkuItemScheme],
  extraSkus: [SkuItemModel],
  paymentConditionClasses: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
  paymentConditionExtra: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
  classSkuFinancialCreated: { type: Boolean, default: false },
  extraSkuFinancialCreated: { type: Boolean, default: false }
}

const Matriculation = new mongoose.Schema(
  MatriculationModel,
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

Matriculation.index({ "student": 1 }, { unique: false })

class MatriculationSearch extends Search {
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

const MatriculationRepository = mongoose.model('matriculation', Matriculation)

export { Matriculation, MatriculationModel, MatriculationRepository, MatriculationSearch }

