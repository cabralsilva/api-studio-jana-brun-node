import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import * as mongoose from 'mongoose'
import { Types, model } from 'mongoose'
import SchoolLevel from '../enum/SchoolLevel'
import { IDefault } from './IDefault'
import Search from '../Search'
import Utils from '../../utils/Utils'

interface IStudent extends IDefault {
  person: Types.ObjectId | any
  responsible: Types.ObjectId | any
  school: Types.ObjectId | any
  schoolLevel: SchoolLevel
  medicinContinuous: boolean
  medicinNotes: string
  allergiesContinuous: boolean
  allergiesNotes: string
  responsibleEmail: string
  responsiblePhone1: string
  responsiblePhone2: string
  responsibleInstagram: string
  responsibleFacebook: string
  active: boolean
}

const StudentSchema = new mongoose.Schema({
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
  responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  schoolLevel: { type: String, enum: Object.keys(SchoolLevel), required: true, default: 'CHILD_EDUCATION_ONE' },
  medicinContinuous: { type: Boolean, required: true, default: false },
  medicinNotes: { type: String },
  allergiesContinuous: { type: Boolean, required: true, default: false },
  allergiesNotes: { type: String },
  responsibleEmail: { type: String, required: true },
  responsiblePhone1: { type: String, required: true },
  responsiblePhone2: { type: String },
  responsibleInstagram: { type: String },
  responsibleFacebook: { type: String },
  active: { type: Boolean, required: true, default: true }
}, {
  timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
})


class StudentSearch extends SearchFlow {
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
          { 'name': { $regex: regex } }
        ]
      }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}


export class StudentSearchOLD extends Search {
  name: { type: String }
  active: { type: Boolean }
  person: mongoose.Types.ObjectId[]

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.active = _query.active
    if (Utils.isNotEmpty(_query.person)) {
      var personArray = _query.person.trim().split(' ')
      this.person = personArray.map(p => new mongoose.Types.ObjectId(p))
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (value) {
        let condition = {}
        if (key === 'person') {
          condition[key] = { $in: value }
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

const StudentRepository = model('student', StudentSchema)

export { IStudent, StudentRepository, StudentSearch }

