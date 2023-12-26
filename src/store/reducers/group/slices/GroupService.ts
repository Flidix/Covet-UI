import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../../http";
import { groupsSlice } from "./GroupsSlice";
import { IGroup } from "../../../../models/group/group";

export const fetchGroups = createAsyncThunk('group/my-groups', async (_, { dispatch }) => {
    try {
        dispatch(groupsSlice.actions.groupsFetching());
        const response = await $api.post<IGroup[]>('group/my-groups')
        dispatch(groupsSlice.actions.groupsFetchingSuccess(response.data));
    } catch (e) {
        dispatch(groupsSlice.actions.groupsFetchingError('error'));
    }
});