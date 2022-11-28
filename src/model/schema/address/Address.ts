import * as mongoose from 'mongoose'

const AddressModel = {
  street: { type: String, required: true },
  number: { type: String },
  complement: { type: String },
  zipCode: { type: String },
  neighborhood: { type: String },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true }
}

export { AddressModel }
