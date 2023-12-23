import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isEmail: boolean
    isLoading: boolean
    error: string
}

const initialState : AuthState = {
    isEmail: false,
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetching(state) {
            state.isLoading = true
        },
        authFetchingSuccess(state) {
            state.isLoading = false
            state.error = ''
            state.isEmail = true
        },
        authFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.isEmail = false
            state.error = action.payload
        },
    }
})

export default authSlice.reducer