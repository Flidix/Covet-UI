import {ICours} from "./ICours";
import {IUser} from "../user/IUser";

export interface IRating {
    description: string
    stars: number
    userId: number
    courseId: number
    toCours: ICours

    fromUser: IUser
}