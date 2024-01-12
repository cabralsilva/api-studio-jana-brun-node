import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
import StatusOfMatriculation from '../enum/StatusOfMatriculation'
import Search from '../Search'
import { ISkuItem, SkuItemModel } from './SkuItem'
import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import { IStudent } from './IStudent'
import { IPerson } from './IPerson'
import { IPaymentCondition } from './IPaymentCondition'
import { ClassSkuItemScheme, IClassSkuItem } from './IClassSkuItem'
import { IDefault } from './IDefault'

export interface IMatriculation extends IDefault {
  sequence: string
  student: mongoose.Types.ObjectId | IStudent
  responsibleFinancial: mongoose.Types.ObjectId | IPerson
  effectiveDateTime: Date
  dayOfMonthToPayment: number
  observation: string
  status: StatusOfMatriculation
  clazzesSkus: IClassSkuItem[]
  extraSkus: ISkuItem[]
  paymentConditionClasses: mongoose.Types.ObjectId | IPaymentCondition
  paymentConditionExtra: mongoose.Types.ObjectId | IPaymentCondition
  classSkuFinancialCreated: boolean
  extraSkuFinancialCreated: boolean
}

const MatriculationModel = {
  sequence: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  responsibleFinancial: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  effectiveDateTime: { type: Date },
  dayOfMonthToPayment: { type: Number },
  observation: { type: String },
  status: { type: String, enum: Object.keys(StatusOfMatriculation), default: 'EFFECTIVE' },
  // clazzesSkus: IClassSkuItem[],
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

export class MatriculationSearch extends SearchFlow {
  constructor(params: any) {
    super(params)
    
    this.buildFilters()
  }

  buildFilters() {
    let filters = this.buildDefaultFilters(this)

    if (isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }

    // if (isNotEmpty(this.searchText)) {
    //   let regex = this.buildRegex(this.searchText)
    //   let condition = {
    //     $or: [
    //       { 'observation': { $regex: regex } },
    //     ]
    //   }
    //   filters.$and.push(condition)
    // }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

class MatriculationSearchOLD extends Search {
  model: { type: typeof MatriculationModel }
  classes: [mongoose.Types.ObjectId]

  constructor(_query) {
    super(_query)
    this.model = _query
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

export { Matriculation, MatriculationModel, MatriculationRepository, MatriculationSearchOLD }

