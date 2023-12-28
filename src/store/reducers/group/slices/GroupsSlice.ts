import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserToGroups } from '../../../../models/group/userToGroups'

interface GroupsState {
    createCgroup: IUserToGroups[]
    groups: IUserToGroups[]
    isLoading: boolean
    error: string
}

const initialState: GroupsState = {
    createCgroup: [],
    groups: [],
    isLoading: false,
    error: ''
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {

        createGroup(state, action: PayloadAction<IUserToGroups>) {
            state.isLoading = false
            state.error = ''
            state.createCgroup.push(action.payload)
        },
        groupsFetching(state) {
            state.isLoading = true
        },
        groupsFetchingSuccess(state, action: PayloadAction<IUserToGroups[]>) {
            state.isLoading = false
            state.error = ''
            state.groups = [...state.groups, ...action.payload]
        },
        groupsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.groups = []
            state.error = action.payload
        },
    }
})

export default groupsSlice.reducer