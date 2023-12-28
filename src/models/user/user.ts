import { IUserToGroups } from '../group/userToGroups'

export interface IUser {
    email: string
    username: string
    password: string
    lastLoginAt: Date
    userAvatar: string
    userToGroups: IUserToGroups[]
}