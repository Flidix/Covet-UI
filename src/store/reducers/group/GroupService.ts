import { createAsyncThunk } from '@reduxjs/toolkit';
import $api, { $socket } from '../../../http';
import { groupsSlice } from './slices/GroupsSlice';
import { IUserToGroups } from '../../../models/group/userToGroups';
import { IGroup } from '../../../models/group/group';
import { groupSlice } from './slices/GroupSlice';

export const fetchGroups = createAsyncThunk(
    'group/my-groups',
    async (_, { dispatch }) => {
      try {
        dispatch(groupsSlice.actions.groupsFetching());
        const response = await $api.get<IUserToGroups[]>('group/my-groups');
        dispatch(groupsSlice.actions.groupsFetchingSuccess(response.data));
      } catch (e) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
      }
    }
  );

  export const fetchGroup = createAsyncThunk(
    'group/:id',
    async (id: string, { dispatch }) => {
      try {
        dispatch(groupSlice.actions.groupFetching());
        const response = await $api.get<IGroup>('group/' + id);
        dispatch(groupSlice.actions.groupFetchingSuccess(response.data));
      } catch (e) {
        dispatch(groupSlice.actions.groupFetchingError('error'));
      }
    }
  );

  export const leave = createAsyncThunk(
    'leave',
    async (payload: { groupId: number }, { dispatch }) => {
      try {
        dispatch(groupsSlice.actions.groupsFetching());
        const userId = localStorage.getItem('userId');
        await $socket.emit('leave', {
          groupId: payload.groupId,
          userId: Number(userId),
        });
      } catch (error) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
      }
    }
  );

  export const onDelete = createAsyncThunk(
    'delete',
    async (payload: { groupId: number }, { dispatch }) => {
      try {
        dispatch(groupsSlice.actions.groupsFetching());
        await $socket.emit('delete', {
          groupId: payload.groupId,
        });
      } catch (error) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
      }
    }
  );

  export const sendMessage = createAsyncThunk(
    'message',
    async (payload: { message: string; groupId: number }, { dispatch }) => {
      try {
        dispatch(groupSlice.actions.groupFetching());
        await $socket.emit('message', {
          message: payload.message,
          groupId: payload.groupId,
        });
      } catch (error) {
        dispatch(groupSlice.actions.groupFetchingError('error'));
      }
    }
  );

  export const createGroup = createAsyncThunk(
    'create',
    async (payload: { name: string; file: any }, { dispatch }) => {
      try {
        const reader = new FileReader();
        const loadPromise = new Promise<ArrayBuffer>((resolve, reject) => {
          reader.onload = (e) => {
            resolve(e.target?.result as ArrayBuffer);
          };
          reader.onerror = (e) => {
            reject(e.target?.error);
          };
        });

        reader.readAsArrayBuffer(payload.file);
        const rawData = await loadPromise;

        $socket.emit('create', {
          type: 'attachment',
          name: payload.name,
          groupAvatar: rawData,
        });
      } catch (error) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
      }
    }
  );

  export const onJoin = createAsyncThunk(
    'join',
    async (payload: { userId: number; groupId: number }, { dispatch }) => {
      try {
        dispatch(groupSlice.actions.groupFetching());
        await $socket.emit('join', { userId: payload.userId, groupId: payload.groupId });
      } catch (error) {
        dispatch(groupSlice.actions.groupFetchingError('error'));
      }
    }
  );