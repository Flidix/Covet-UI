import {IUser} from "../user/IUser";
import {IVideo} from "./IVideo";
import {IComment} from "./IComment";

export interface ICommentToComment {
    comment: string
    userId: number
    fromUser: IUser
    toComment: IComment
    commentId: number
}