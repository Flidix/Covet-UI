import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserToGroups } from '../../../../models/group/userToGroups';
import { ILeaveResponse } from '../../../../models/responses/leaveResponse';

interface GroupsState {
  createUser: IUserToGroups[];
  groups: IUserToGroups[];
  hasMore: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: GroupsState = {
  hasMore: false,
  createUser: [],
  groups: [],
  isLoading: false,
  error: '',
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    onLeave(state, action: PayloadAction<ILeaveResponse>) {
      state.isLoading = false;
      state.error = '';
      if (action.payload.userId === Number(localStorage.getItem('userId'))) {
        state.groups = state.groups.filter((group) => group.groupId !== action.payload.groupId);
      }
    },

    onDelete(state, action: PayloadAction<ILeaveResponse>) {
      state.isLoading = false;
      state.error = '';
      state.groups = state.groups.filter((group) => group.groupId !== action.payload.groupId);
    },
    joinGroup(state, action: PayloadAction<{group: IUserToGroups}>) {
      state.isLoading = false;
      state.error = '';
      if(action.payload.group.userId === Number(localStorage.getItem('userId'))) {
        state.groups.unshift(action.payload.group);
      }
      state.createUser.push(action.payload.group);
    },
    createGroup(state, action: PayloadAction<IUserToGroups>) {
      state.isLoading = false;
      state.error = '';
      if(action.payload.group.userId === Number(localStorage.getItem('userId'))) {
        state.groups.unshift(action.payload);
      }
    },
    groupsFetching(state) {
      state.isLoading = true;
    },
    groupsFetchingSuccess(state, action: PayloadAction<IUserToGroups[]>) {
      state.groups = action.payload;
      state.isLoading = false;
      state.error = '';
    },

    paginateGroups(state, action: PayloadAction<IUserToGroups[]>) {
      state.groups = [ ...state.groups, ...action.payload];
      console.log(action.payload);

      state.hasMore = action.payload.length !== 5;
      state.isLoading = false;
      state.error = '';
    },
    groupsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.groups = [];
      state.error = action.payload;
    },
  },
});

export default groupsSlice.reducer;