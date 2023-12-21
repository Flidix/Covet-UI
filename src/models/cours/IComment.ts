import {IUser} from "../user/IUser";
import {IVideo} from "./IVideo";
import {ICommentToComment} from "./ICommentToComment";

export interface IComment {
    comment: string
    userId: number
    fromUser: IUser
    toVideo: IVideo
    comments: ICommentToComment
}