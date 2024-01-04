import { IMessage } from '../message/message'
import { IUser } from '../user/user'
import { IUserToGroups } from './userToGroups'

export interface IGroup {
    id: number
    name: string
    user: IUser
    userId: number
    groupAvatar?: string
    messages: IMessage[]
    userToGroups: IUserToGroups[]
}
