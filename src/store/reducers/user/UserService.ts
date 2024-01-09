import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';


export const fetchUpdateUser = createAsyncThunk(
    'updateUser',
    async (payload: {username: string, userAvatar: File}) => {
        const formData = new FormData();
        formData.append('username', payload.username);
        formData.append('userAvatar', payload.userAvatar);
        const response = await $api.patch('user/update', formData);
        console.log(response.data);
    }
  );