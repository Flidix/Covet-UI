import { createAsyncThunk } from '@reduxjs/toolkit';
import $api, { $socket } from '../../../http';
import { groupsSlice } from './slices/GroupsSlice';
import { IUserToGroups } from '../../../models/group/userToGroups';
import { IGroup } from '../../../models/group/group';
import { groupSlice } from './slices/GroupSlice';

export const fetchGroups = createAsyncThunk('group/my-groups', async (_, { dispatch }) => {
    try {
        dispatch(groupsSlice.actions.groupsFetching());
        const response = await $api.get<IUserToGroups[]>('group/my-groups')
        dispatch(groupsSlice.actions.groupsFetchingSuccess(response.data));
    } catch (e) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
});

export const fetchGroup = createAsyncThunk('group/:id', async (id: string, { dispatch }) => {
    try {
        dispatch(groupSlice.actions.groupFetching());
        const response = await $api.get<IGroup>('group/' + id)
        dispatch(groupSlice.actions.groupFetchingSuccess(response.data));
    } catch (e) {
        dispatch(groupSlice.actions.groupFetchingError('error'));
    }
});

export const sendMessage = createAsyncThunk('message', async (payload: {message: string, groupId: number}, { dispatch }) => {
    try {

    dispatch(groupSlice.actions.groupFetching());

    await $socket.emit('message', { message: payload.message, groupId: payload.groupId });

    $socket.on('message', (data: any) => {
        dispatch(groupSlice.actions.createMessage(data));
    })

    return () => {
        $socket.removeListener('message');
    };

  } catch (error) {
    dispatch(groupSlice.actions.groupFetchingError('error'));
  }
})

export const createGroup = createAsyncThunk('create', async (name: string, { dispatch }) => {
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

