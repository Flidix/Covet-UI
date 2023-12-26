import { IMessage } from "../message/message"
import { IUser } from "../user/user"
import { IUserToGroups } from "./userToGroups"

export interface IGroup {
    name: string
    user: IUser
    userId: number
    messages: IMessage[]
    userToGroups: IUserToGroups[]
}
