import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ConfirmAuthState {
    isAuth: boolean
    isLoading: boolean
    error: string
}

const initialState : ConfirmAuthState = {
    isAuth: false,
    isLoading: false,
    error: ''
}

export const confirmAuthSlice = createSlice({
    name: 'confirmAuth',
    initialState,
    reducers: {
        confirmAuthFetching(state) {
            state.isLoading = true
        },
        confirmAuthFetchingSuccess(state) {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
        },
        confirmAuthFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.isAuth = false
            state.error = action.payload
        },
    }
})

export default confirmAuthSlice.reducer