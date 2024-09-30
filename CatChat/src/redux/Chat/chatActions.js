import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getManager,
  getManagers,
  getRooms,
  replaceManager,
} from 'services/API';

export const fetchManagers = createAsyncThunk(
  'chat/fetchManagers',
  async () => {
    return await getManagers();
  }
);

export const fetchManager = createAsyncThunk(
  'chat/fetchManager',
  async username => {
    return await getManager(username);
  }
);

export const fetchRooms = createAsyncThunk(
  'chat/fetchRooms',
  async username => {
    return await getRooms(username);
  }
);

export const replaceChatManager = createAsyncThunk(
  'chat/replaceChatManager',
  async ({ roomId, oldManagerUsername, newManagerUsername }) => {
    return await replaceManager(roomId, oldManagerUsername, newManagerUsername);
  }
);
