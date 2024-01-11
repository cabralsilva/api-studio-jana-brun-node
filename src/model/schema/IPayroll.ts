import * as mongoose from 'mongoose'
import StatusOfPayroll from '../enum/StatusOfPayroll'
import TypeOfPayroll from '../enum/TypeOfPayroll'
import TypeOfSalary from '../enum/TypeOfSalary'
import Search from '../Search'
import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import { IClass } from './IClass'

export interface IPaymentMonthDetail {
  label: string,
  quantityOfDays: number,
  total: number
}

export interface IPaymentByPercentDetail {
  quantityOfMatriculation: number,
  percent: number,
  baseValue: number,
  total: number
}

export interface IPaymentByHourDetail {
  day: string,
  hoursFactor: number,
  hourValue: number,
  hoursLabel: string,
  total: number
}

export interface IPaymentMonthly {
  details: IPaymentMonthDetail[],
  total: number
}

export interface IPaymentClass {
  clazz: {
    _id: mongoose.Types.ObjectId | IClass
    name: string
  }
  type: string
  percentDetails: IPaymentByPercentDetail
  hoursDetails: IPaymentByHourDetail[]
  total: number
}

export interface IEmployeePayment {
  type: TypeOfPayroll
  total: number
  regularValueTotal: number
  variableValueTotal: number
  monthly: IPaymentMonthly
  classes: IPaymentClass[]
}

export interface IPayrollEmployeeDetail {
  description: string
  employee: {
    _id: mongoose.Types.ObjectId | any
    name: string
  },
  payments: IEmployeePayment[]
  regularValueTotal: number
  variableValueTotal: number
  total: number
}

export interface IPayroll {
    description: string
    initDate: string
    endDate: string
    targetDate: string
    regularPayroll: boolean
    variablePayroll: boolean
    payrollEmployeeDetails: IPayrollEmployeeDetail[]
}

interface PaymentMonthDetail {
  label: String,
  quantityOfDays: Number,
  total: Number
}

interface PaymentMonthly {
  details: PaymentMonthDetail[],
  total: Number
}

interface PaymentByPercentDetail {
  quantityOfMatriculation: Number,
  percent: Number,
  baseValue: Number,
  total: Number
}

interface PaymentByHourDetail {
  day: String,
  hoursFactor: Number,
  hourValue: Number,
  hoursLabel: String,
  total: Number
}

interface PaymentClass {
  clazz: {
    _id: mongoose.Types.ObjectId,
    name: String
  },
  type?: String,
  percentDetails?: PaymentByPercentDetail,
  hoursDetails?: PaymentByHourDetail[],
  total?: Number
}

interface EmployeePayment {
  type?: String,
  total?: Number,
  regularValueTotal?: Number,
  variableValueTotal?: Number,
  monthly?: PaymentMonthly,
  classes?: PaymentClass[]
}
interface PayrollEmployeeDetail {
  description: String,
  employee: {
    _id: mongoose.Types.ObjectId,
    name: String
  },
  payments?: EmployeePayment[],
  regularValueTotal?: Number,
  variableValueTotal?: Number,
  total?: Number
}

const PayrollMonthlyDetail = {
  label: { type: String },
  quantityOfDays: { type: Number },
  total: { type: Number }
}
const PayrollMonthly = {
  details: [PayrollMonthlyDetail],
  total: { type: Number }
}

const PayrollEmployeeDetail = {
  description: { type: String, required: true },
  employee: {
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true }
  },
  payments: [
    {
      type: { type: String, enum: TypeOfPayroll, required: true },
      total: { type: Number },
      monthly: PayrollMonthly,
      classes: [{
        clazz: {
          _id: { type: mongoose.Types.ObjectId },
          name: { type: String }
        },
        type: { type: String, enum: Object.keys(TypeOfSalary), required: true },
        percentDetails: {
          quantityOfMatriculation: { type: Number },
          percent: { type: Number },
          baseValue: { type: Number },
          total: { type: Number }
        },
        hoursDetails: [{
          day: { type: Date },
          hoursFactor: { type: Number },
          hourValue: { type: Number },
          hoursLabel: { type: String },
          total: { type: Number }
        }],
        total: { type: Number }
      }]
    }
  ],
  variableValueTotal: { type: Number, default: 0 },
  regularValueTotal: { type: Number, default: 0 },
  total: { type: Number, required: true, default: 0 },
}

const PayrollModel = {
  description: { type: String, required: true },
  initDate: { type: String, required: true },
  endDate: { type: String, required: true },
  targetDate: { type: String, required: true },
  regularPayroll: { type: Boolean, default: true },
  variablePayroll: { type: Boolean, default: true },
  payrollEmployeeDetails: [PayrollEmployeeDetail]
}

const Payroll = new mongoose.Schema(PayrollModel)

export class PayrollSearch extends SearchFlow {
  constructor(params: any) {
    super(params)
    
    this.buildFilters()
  }

  buildFilters() {
    let filters = this.buildDefaultFilters(this)

    if (isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }

    if (isNotEmpty(this.searchText)) {
      let regex = this.buildRegex(this.searchText)
      let condition = {
        $or: [
          { 'name': { $regex: regex } },
          { 'tradeName': { $regex: regex } }
        ]
      }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

class PayrollSearchOLD extends Search {

  constructor(_query) {
    super(_query)
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
        return
      }

      if (value) {
        let condition = {}
        if (key === 'searchText' as any) {
          this.searchText = this.diacriticSensitiveRegex(this.searchText)
          condition = {
            $or: [
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'payrollDetails.employee.name': { $regex: this.searchText as any, $options: 'i' } }
            ]
          }
        } else {
          if (!Array.isArray(value)) {
            condition[key] = value
          } else {
            condition[key] = { $in: value }
          }
        }
        filters.$and.push(condition)
      }
    })
    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const PayrollRepository = mongoose.model('payroll', Payroll)

export {
  Payroll, PayrollModel, PayrollMonthly, PayrollEmployeeDetail, EmployeePayment, PaymentMonthly, PaymentClass, PaymentMonthDetail, PaymentByHourDetail, PaymentByPercentDetail,
  PayrollRepository, PayrollSearchOLD
}

