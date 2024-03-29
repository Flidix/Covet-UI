import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGroup } from '../../../../models/group/group';
import { IMessage } from '../../../../models/message/message';
import { IUserToGroups } from '../../../../models/group/userToGroups';
import { ILeaveResponse } from '../../../../models/responses/leaveResponse';
import { IUser } from '../../../../models/user/user';

export interface onTypingInterface {
  userId?: number
  isTyping: boolean
  groupId: number
  user?: IUser
}

export interface onUpdateMessageResponse {
  messageId: number
  message: string
}

export interface deleteMessageResponse {
  messageId: number
  userId: number
}

interface GroupState {
  hasMoreMessages: boolean
  isTyping: onTypingInterface[]
  showGroupInfo: boolean
  showGroups: boolean
  users: IUserToGroups[]
  messages: IMessage[]
  group: IGroup
  isLoading: boolean
  error: string
}

const initialState: GroupState = {
  hasMoreMessages: true,
  isTyping: [],
  showGroupInfo: false,
  showGroups: false,
  users: [],
  messages: [],
  group: {} as IGroup,
  isLoading: false,
  error: ''
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    onUpdateMessage(state, action: PayloadAction<onUpdateMessageResponse>) {
      state.messages = state.messages.map((item) =>
        item.id === action.payload.messageId
          ? { ...item, message: action.payload.message }
          : item
      );
    },

    onDeleteMessage(state, action: PayloadAction<deleteMessageResponse>) {
      state.messages = state.messages.filter((item) => item.id !== action.payload.messageId);
    },

    onNoTyping(state, action: PayloadAction<onTypingInterface>) {
      state.isTyping = state.isTyping.map((item: onTypingInterface) =>
        item.groupId === action.payload.groupId && item.userId === action.payload.userId && item.isTyping
          ? { ...item, isTyping: false }
          : item
      );
    },

    onTyping(state, action: PayloadAction<onTypingInterface>) {
      if(!action.payload.isTyping){
        const check = state.isTyping.find((item) => item.groupId === action.payload.groupId && item.user?.id === action.payload.user?.id);
        if (check) {
          check.isTyping = false;
          state.isTyping = state.isTyping.filter(
            (item) =>item.userId !== action.payload.userId
          );
        }
      }

      if(action.payload.isTyping){
        const check = state.isTyping.find((item) => item.groupId === action.payload.groupId && item.user?.id === action.payload.user?.id);

        if (!check) {
          state.isTyping = [...state.isTyping, action.payload];
        }
      }
    },

    showGroupInfo(state) {
      state.showGroupInfo = !state.showGroupInfo;
    },
    showGroups(state) {
      state.showGroups = !state.showGroups;
    },

    onLeave(state, action: PayloadAction<ILeaveResponse>) {
      state.isLoading = false;
      state.error = '';
      state.users = state.users.filter((user) => !(user.groupId === action.payload.groupId && user.userId === action.payload.userId));
    },

    onJoin(state, action: PayloadAction<IUserToGroups>) {
      state.isLoading = false;
      state.error = '';
      if(state.group.id === action.payload.groupId) {
        state.users.push(action.payload);
      }
    },
    createMessage(state, action: PayloadAction<IMessage>) {
      state.isLoading = false;
      state.error = '';
      state.messages.push(action.payload);
    },

    groupFetching(state) {
      state.isLoading = true;
    },

    paginateGroupMessage(state, action: PayloadAction<IMessage[]>) {
      state.isLoading = false;
      state.error = '';
      state.messages = [ ...action.payload, ...state.messages];
      state.hasMoreMessages = action.payload.length <= 10;
    },

    newGroupMessage(state) {
      state.messages = [];
    },

    groupFetchingSuccess(state, action: PayloadAction<IGroup>) {
      state.messages = [];
      state.users = [];
      state.group = {} as IGroup;
      state.isLoading = false;
      state.error = '';
      state.group = action.payload;
      state.users = action.payload.userToGroups;
      state.messages = action.payload.messages;
    },

    groupFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.group = {} as IGroup;
      state.error = action.payload;
    },
  },
});

export default groupSlice.reducer;
