import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGroup } from '../../../../models/group/group'

interface GroupsState {
    createCgroup: IGroup[]
    groups: IGroup[]
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

        createGroup(state, action: PayloadAction<IGroup>) {
            state.isLoading = false
            state.error = ''
            state.createCgroup.push(action.payload)
            console.log(action.payload);

            state.groups.push(action.payload)
        },
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