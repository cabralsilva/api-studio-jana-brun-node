import * as mongoose from 'mongoose'
import SchoolLevel from '../enum/SchoolLevel'
import Search from '../Search'

const StudentModel = {
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
}

const Student = new mongoose.Schema(StudentModel)

class StudentSearch extends Search {
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
              { 'person.name': { $regex: this.searchText as any, $options: 'i' } }
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

const StudentRepository = mongoose.model('student', Student)

export { Student, StudentModel, StudentRepository, StudentSearch }

