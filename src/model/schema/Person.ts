import Genre from '../enum/Genre'
import TypeOfPerson from '../enum/TypeOfPerson'
import { AddressModel } from './address/Address'


const PersonModel = {
  name: { type: String, required: true },
  tradeName: { type: String },
  socialId: { type: String, required: true },
  documentNumber: { type: String },
  bornDate: { type: String, required: true },
  genre: { type: String, enum: Object.keys(Genre), required: true, default: 'NSA' },
  type: { type: String, enum: Object.keys(TypeOfPerson), required: true, default: 'NATURAL' },
  address: AddressModel
}

export { PersonModel }
