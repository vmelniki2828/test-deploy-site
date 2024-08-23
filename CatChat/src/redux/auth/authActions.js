import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFoo, token, getCurrentUser  } from "services/API"; 
// getUsers

export const loginThunk = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await loginFoo(credentials);
    token.set(response.access);
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (credentials, thunkAPI) => {
  try {
    return token.unset();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      const response = await getCurrentUser();
    token.set(response.token);
    return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);