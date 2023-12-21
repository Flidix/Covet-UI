import {ICours} from "./ICours";
import {IUser} from "../user/IUser";
import {IComment} from "./IComment";

export interface IVideo {
    video: string
    description: string
    name: string
    likesCount: number
    fromUser: IUser
    toCours: ICours

    comments: IComment[]
    userId: number
}