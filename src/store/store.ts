import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/slices/AuthSlice'
import confirmAuthReducer from './reducers/auth/slices/ConfirmAuthSlice'
import groupsReducer from './reducers/group/slices/GroupsSlice'
import groupReducer from './reducers/group/slices/GroupSlice'


const rootReducer = combineReducers({
    confirmAuthReducer,
    authReducer,
    groupsReducer,
    groupReducer
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']