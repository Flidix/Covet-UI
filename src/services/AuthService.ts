import { AxiosResponse } from "axios"
import $api from "../http"
import { AuthResponse } from "../models/response/AuthResponse"

export default class AuthService {
    static async login(email: string, username: string, password: string) {
        return $api.post('auth/login', {email, username, password})
    }

    static async register(email: string, username: string, password: string) {
        $api.post('auth/register', {email, username, password})
        return true
    }

    static async confirmAuth(id: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('auth/confirmation/user/'+ id)
    }
}