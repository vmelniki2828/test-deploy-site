import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, getCurrentUserToken } from 'services/API';

export const getCurrentUserThunk = createAsyncThunk(
  'user/getCurrentUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await getCurrentUser(credentials);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCurrentUserTokenThunk = createAsyncThunk(
  'user/getCurrentUserToken',
  async (token, thunkAPI) => {
    try {
      const response = await getCurrentUserToken(token);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

