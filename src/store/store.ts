import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/slices/AuthSlice'
import confirmAuthReducer from './reducers/auth/slices/ConfirmAuthSlice'

const rootReducer = combineReducers({
    confirmAuthReducer,
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']