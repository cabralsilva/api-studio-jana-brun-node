import { Types } from "mongoose"

export interface Default {
    [key: string]: any
    _id?: Types.ObjectId
    createdAtDateTime?: Date
    updatedAtDateTime?: Date
}
