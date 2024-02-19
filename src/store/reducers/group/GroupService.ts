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

interface FetchGroupsParams {
  page?: number;
  pageSize?: number;
}

export const fetchPaginateGroups = createAsyncThunk(
  'group/paginate',
  async ({ page, pageSize }: FetchGroupsParams, { dispatch }) => {
    try {
      dispatch(groupsSlice.actions.groupsFetching());

      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', String(page));
      if (pageSize !== undefined) params.append('pageSize', String(pageSize));

      const url = `group/my-groups?${params.toString()}`;

      const response = await $api.get<IUserToGroups[]>(url);

      dispatch(groupsSlice.actions.paginateGroups(response.data));
    } catch (e) {
      dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
  }
);



interface FetchGroupParams {
  id: string;
  page?: number;
  pageSize?: number;
}

export const fetchGroup = createAsyncThunk(
  'group/:id',
  async ({ id, page, pageSize }: FetchGroupParams, { dispatch }) => {
    try {
      dispatch(groupSlice.actions.groupFetching());

      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', String(page));
      if (pageSize !== undefined) params.append('pageSize', String(pageSize));

      const url = `group/${id}?${params.toString()}`;
      const response = await $api.get<IGroup>(url);


      dispatch(groupSlice.actions.groupFetchingSuccess(response.data));
    } catch (e) {
      dispatch(groupSlice.actions.groupFetchingError('error'));
    }
  }
);

export const fetchGroupMessage = createAsyncThunk(
  'group/fetchGroupMessage',
  async ({ id, page, pageSize }: FetchGroupParams, { dispatch }) => {
    try {
      dispatch(groupSlice.actions.groupFetching());

      const params = new URLSearchParams();
      if (page !== undefined) params.append('page', String(page));
      if (pageSize !== undefined) params.append('pageSize', String(pageSize));

      const url = `group/${id}?${params.toString()}`;
      const response = await $api.get<IGroup>(url);

      dispatch(groupSlice.actions.paginateGroupMessage(response.data.messages));
      return response.data;
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
  'onDelete',
  async (payload: { groupId: number }, { dispatch }) => {
    try {
      dispatch(groupsSlice.actions.groupsFetching());
      await $socket.emit('onDelete', {
        groupId: payload.groupId,
      });
    } catch (error) {
      dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
  }
);



export const onDeleteMessage = createAsyncThunk(
  'deleteMessage',
  async (payload: { messageId: number }, { dispatch }) => {
    try {
      dispatch(groupsSlice.actions.groupsFetching());
      await $socket.emit('deleteMessage', {
        messageId: payload.messageId,
      });
    } catch (error) {
      dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
  }
);

export const onUpdateMessage = createAsyncThunk(
  'updateMessage',
  async (payload: { messageId: number, message: string }, { dispatch }) => {
    try {
      dispatch(groupsSlice.actions.groupsFetching());
      await $socket.emit('updateMessage', {
        messageId: payload.messageId,
        message: payload.message,
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

let typingTimeoutId: NodeJS.Timeout | null = null;

export const onTyping = createAsyncThunk(
  'typing',
  async (payload: { groupId: number }, { dispatch }) => {
    try {
      dispatch(groupSlice.actions.groupFetching());

      await $socket.emit('typing', { isTyping: true, groupId: payload.groupId });

      if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
      }

      typingTimeoutId = setTimeout(() => {
        $socket.emit('typing', { isTyping: false, groupId: payload.groupId });
        typingTimeoutId = null;
      }, 2000);
    } catch (error) {
      dispatch(groupSlice.actions.groupFetchingError('error'));
    }
  }
);