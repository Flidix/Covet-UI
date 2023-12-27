import { createAsyncThunk } from '@reduxjs/toolkit';
import $api, { $socket } from '../../../http';
import { groupsSlice } from './slices/GroupsSlice';
import { IUserToGroups } from '../../../models/group/userToGroups';

export const fetchGroups = createAsyncThunk('group/my-groups', async (_, { dispatch }) => {
    try {
        dispatch(groupsSlice.actions.groupsFetching());
        const response = await $api.get<IUserToGroups[]>('group/my-groups')
        dispatch(groupsSlice.actions.groupsFetchingSuccess(response.data));
    } catch (e) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
});

export const createGroup = createAsyncThunk('group/create', async (name: string, { dispatch }) => {
        try {
        dispatch(groupsSlice.actions.groupsFetching());

        await $socket.emit('create', { name });

        $socket.on('create', (data: any) => {
            dispatch(groupsSlice.actions.createGroup(data));
        })

        return () => {
            $socket.removeListener('create');
        };

      } catch (error) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
      }
})

