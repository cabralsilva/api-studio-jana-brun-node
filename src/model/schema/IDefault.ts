import { Types } from "mongoose"

export interface IDefault {
    [key: string]: any
    _id?: Types.ObjectId
    createdAtDateTime?: Date
    updatedAtDateTime?: Date
}
