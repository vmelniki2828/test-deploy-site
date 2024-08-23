import { createSlice } from '@reduxjs/toolkit';
import { loginThunk,refreshUserThunk } from './authActions';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  refreshToken: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.refreshToken = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; 
        state.refreshToken = action.payload.refresh;
        state.accessToken = action.payload.access;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.refreshToken = action.payload.refresh;
        state.accessToken = action.payload.access;
        state.isLoading = false;
        state.isAuthenticated = true; 
        state.error = null;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
