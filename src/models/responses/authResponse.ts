import { IUser } from "../user/user"

export interface AuthResponse {
    accessToken: string
    refreshToken: string

    user: IUser
}