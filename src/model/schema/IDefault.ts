import { Types } from "mongoose"

export interface IDefault {
    [key: string]: any
    _id?: Types.ObjectId
    created_at?: Date
    createdAtDateTime?: Date
    updatedAtDateTime?: Date
}
