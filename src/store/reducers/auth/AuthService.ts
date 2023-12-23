import { AxiosResponse } from 'axios'
import $api from '../../../http'
import { AuthResponse } from '../../../models/response/AuthResponse'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authSlice } from './slices/AuthSlice'
import { confirmAuthSlice } from './slices/ConfirmAuthSlice'

export default class AuthService {
    static async login(email: string, username: string, password: string) {
        return $api.post('auth/login', { email, username, password })
    }

    static async register(email: string, username: string, password: string) {
        $api.post('auth/register', { email, username, password })
        return true
    }

    static async confirmAuth(id: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('auth/confirmation/user/'+ id)
    }
}


export const fetchLogin = createAsyncThunk('auth/login', async (payload: {email: string, username: string, password: string}, { dispatch }) => {
    try {
        dispatch(authSlice.actions.authFetching());
        await $api.post('auth/login', payload);
        dispatch(authSlice.actions.authFetchingSuccess());
    } catch (e) {
        dispatch(authSlice.actions.authFetchingError('error'));
    }
});

export const fetchRegister = createAsyncThunk('auth/register', async (payload: {email: string, username: string, password: string}, { dispatch }) => {
    try {
        dispatch(authSlice.actions.authFetching());
        await $api.post('auth/register', payload);

        dispatch(authSlice.actions.authFetchingSuccess());
    } catch (e) {
        dispatch(authSlice.actions.authFetchingError('error'));
    }
});


export const fetchConfirmAuth = createAsyncThunk('auth/confirmation/user/', async (payload: {id: string}, { dispatch }) => {
    try {
        dispatch(confirmAuthSlice.actions.confirmAuthFetching());
        const response = await $api.get<AuthResponse>('auth/confirmation/user/'+ payload.id)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(confirmAuthSlice.actions.confirmAuthFetchingSuccess());
    } catch (e) {
        dispatch(confirmAuthSlice.actions.confirmAuthFetchingError('error'));
    }
});

export const fetchCheckAuth = createAsyncThunk('auth/access-token', async (_, { dispatch }) => {
    try {
        dispatch(confirmAuthSlice.actions.confirmAuthFetching())
        const refreshToken = localStorage.getItem('refreshToken');

        const requestBody = {
            refreshToken: refreshToken,
        };
        const response = await $api.post<AuthResponse>('auth/access-token', requestBody);

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        dispatch(confirmAuthSlice.actions.confirmAuthFetchingSuccess())

    } catch (e) {
        dispatch(confirmAuthSlice.actions.confirmAuthFetchingError('error'))
    }
});
