import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
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
  status: { type: String, enum: Object.keys(StatusOfMatriculation), default: 'EFFECTIVE' },
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
  model: { type: typeof MatriculationModel }
  // name: { type: String }
  // active: { type: Boolean }
  // student: mongoose.Types.ObjectId[]
  classes: [mongoose.Types.ObjectId]

  constructor(_query) {
    super(_query)
    this.model = _query
    // this.name = _query.name
    // this.active = _query.active
    // if (Utils.isNotEmpty(_query.student)) {
    //   var personArray = _query.student.trim().split(' ')
    //   this.student = personArray.map(p => new mongoose.Types.ObjectId(p))
    // }
    if (Utils.isNotEmpty(_query?.classes)) {
      if (!Array.isArray(_query.classes)) {
        _query.classes = _query.classes.toString().split(',')
      }
      this.classes = _query.classes.map(data => new mongoose.Types.ObjectId(data))
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = super.getFilters(this)
    if (Utils.isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }
    super.addFilterModel(this.model, filters)

    if (Utils.isNotEmpty(this.classes)) {
      let condition = { 'clazzesSkus.clazz': { $in: this.classes || [] } }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
      
    this.filters = filters
  }
}

const MatriculationRepository = mongoose.model('matriculation', Matriculation)

export { Matriculation, MatriculationModel, MatriculationRepository, MatriculationSearch }

