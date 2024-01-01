import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGroup } from '../../../../models/group/group'
import { IMessage } from '../../../../models/message/message'
import { IUserToGroups } from '../../../../models/group/userToGroups'

interface GroupState {
    createUser: IUserToGroups[]
    users: IUserToGroups[]
    createMessage: IMessage[]
    messages: IMessage[]
    group: IGroup
    isLoading: boolean
    error: string
}

const initialState: GroupState = {
    createUser: [],
    users: [],
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

      onLeave(state, action: PayloadAction<{groupId: number, userId: number}>) {
        state.isLoading = false
        state.error = ''
        console.log(state.createUser, state.users, 456789);

        state.createUser = state.createUser.filter((user) =>
          user.userId !== action.payload.userId && user.groupId !== action.payload.groupId)
        state.users = state.users.filter((user) => user.userId !== action.payload.userId && user.groupId !== action.payload.groupId)
      },
      onJoin(state, action: PayloadAction<IUserToGroups>) {
        state.isLoading = false
        state.error = ''
        state.createUser.push(action.payload)
        state.users.push(action.payload);
      },
      createMessage(state, action: PayloadAction<IMessage>) {
        state.isLoading = false;
        state.error = '';
        state.createMessage.push(action.payload);
        state.messages.push(action.payload);
      },
      groupFetching(state) {
        state.isLoading = true;
      },
      groupFetchingSuccess(state, action: PayloadAction<IGroup>) {
        state.users = [];
        state.createUser = [];
        state.group = {} as IGroup;
        state.createMessage = [];
        state.messages = [];
        state.isLoading = false;
        state.error = '';
        state.group = action.payload;
        state.users = action.payload.userToGroups
        state.messages = [...state.messages, ...action.payload.messages].reverse();
      },
      groupFetchingError(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.group = {} as IGroup;
        state.error = action.payload;
      },
    },
  });


export default groupSlice.reducer