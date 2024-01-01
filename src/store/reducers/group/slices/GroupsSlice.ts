import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserToGroups } from '../../../../models/group/userToGroups';

interface GroupsState {
  groups: IUserToGroups[];
  isLoading: boolean;
  error: string;
}

const initialState: GroupsState = {
  groups: [],
  isLoading: false,
  error: '',
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    joinGroup(state, action: PayloadAction<{group: IUserToGroups}>) {
      state.isLoading = false;
      state.error = '';
      console.log(action.payload.group);
      if(action.payload.group.userId === Number(localStorage.getItem('userId'))) {
        state.groups.unshift(action.payload.group);
      }
    },
    createGroup(state, action: PayloadAction<IUserToGroups>) {
      state.isLoading = false;
      state.error = '';
      state.groups.unshift(action.payload);
    },
    groupsFetching(state) {
      state.isLoading = true;
    },
    groupsFetchingSuccess(state, action: PayloadAction<IUserToGroups[]>) {
      state.groups = action.payload.reverse();
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