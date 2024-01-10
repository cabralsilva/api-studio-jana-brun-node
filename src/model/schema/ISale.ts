import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import * as mongoose from 'mongoose'
import { Types, model } from 'mongoose'
import { IDefault } from './IDefault'
import { IProduct } from './IProduct'

export interface IInstallment {
  sequence: number
  value: number
  dueDate: Date
}

export interface ISalePaymentInstallment {
  paymentCondition: string | any
  installments: IInstallment[]
}

export interface ISalePayment {
  sequence: number
  description: string
  value: number
  installment: ISalePaymentInstallment
}

export interface ISaleFinancial {
  totalValue: number
  discountValue: number
  finalValue: number
  paidValue: number
  openedValue: number
}


export interface ISaleItemGrate {
  grate: Types.ObjectId | any
  descriptionGrate: string
  grateItem: Types.ObjectId | any
  descriptionGrateItem: string
  value: string
}

export interface ISaleItem {
  sequence: number
  code: string
  description: string
  product: Types.ObjectId | IProduct
  gratesItems: ISaleItemGrate[]
  quantity: number
  unitValue: number
  totalValue: number
  discountValue: number
  finalValue: number
}

export interface ISaleCustomerData {
  customer: Types.ObjectId | IProduct
  name: string
}

export interface ISale extends IDefault {
  customerData: ISaleCustomerData
  payments: ISalePayment[]
  financial: ISaleFinancial
  items: ISaleItem[]
}

const SaleSchema = new mongoose.Schema({
  customerData: {
    type: {
      customer: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
      name: { type: String }
    }
  },
  payments: {
    type: [{
      description: { type: String },
      value: { type: Number },
      installment: {
        type: {
          paymentCondition: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
          installments: {
            type: [{
              sequence: { type: Number },
              value: { type: Number },
              dueDate: { type: Date },
            }]
          },
        }
      },
    }]
  },
  financial: {
    type: {
      totalValue: { type: Number },
      discountValue: { type: Number },
      finalValue: { type: Number },
      paidValue: { type: Number },
      openedValue: { type: Number },
    }
  },

  items: {
    type: [{
      sequence: { type: Number },
      code: { type: String },
      description: { type: String },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
      gratesItems: {
        type: [{
          grate: { type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true },
          descriptionGrate: { type: String, required: true },
          grateItem: { type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true },
          descriptionGrateItem: { type: String, required: true },
          value: { type: String, required: true },
        }]
      },
      quantity: { type: Number },
      unitValue: { type: Number },
      totalValue: { type: Number },
      discountValue: { type: Number },
      finalValue: { type: Number },
    }]
  }
}, {
  timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
})


class SaleSearch extends SearchFlow {
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
      // let regex = this.buildRegex(this.searchText)
      // let condition = {
      //   $or: [
      //     { 'name': { $regex: regex } }
      //   ]
      // }
      // filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const SaleRepository = model('sale', SaleSchema)

export { SaleRepository, SaleSearch }

