import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGroup } from '../../../../models/group/group'

interface GroupsState {
    groups: IGroup[]
    isLoading: boolean
    error: string
}

const initialState: GroupsState = {
    groups: [],
    isLoading: false,
    error: ''
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        groupsFetching(state) {
            state.isLoading = true
        },
        groupsFetchingSuccess(state, action: PayloadAction<IGroup[]>) {
            state.isLoading = false
            state.error = ''
            state.groups = action.payload
        },
        groupsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.groups = []
            state.error = action.payload
        },
    }
})

export default groupsSlice.reducer