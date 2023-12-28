import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGroup } from '../../../../models/group/group'
import { IMessage } from '../../../../models/message/message'

interface GroupState {
    createMessage: IMessage[]
    messages: IMessage[]
    group: IGroup
    isLoading: boolean
    error: string
}

const initialState: GroupState = {
    createMessage: [],
    messages: [],
    group: {} as IGroup,
    isLoading: false,
    error: ''
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
      createMessage(state, action: PayloadAction<IMessage>) {
        state.isLoading = false;
        state.error = '';
        state.createMessage.push(action.payload);
      },
      groupFetching(state) {
        state.isLoading = true;
      },
      groupFetchingSuccess(state, action: PayloadAction<IGroup>) {
        state.group = {} as IGroup;
        state.createMessage = [];
        state.messages = [];
        state.isLoading = false;
        state.error = '';
        state.group = action.payload;
        state.messages = [...state.messages, ...action.payload.messages];
      },
      groupFetchingError(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.group = {} as IGroup;
        state.error = action.payload;
      },
    },
  });


export default groupSlice.reducer