import { IUserToGroups } from '../group/userToGroups'

export interface IUser {
    id: number
    email: string
    username: string
    password: string
    lastLoginAt: Date
    userAvatar: string
    userToGroups: IUserToGroups[]
}