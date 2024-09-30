import { createSlice } from '@reduxjs/toolkit';
import { fetchManager, fetchManagers, fetchRooms } from './chatActions';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChat: null,
    managers: [],
    currentManager: null,
    chats: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    resetChatState(state) {
      state.managers = [];
      state.currentManager = null;
      state.chats = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchManagers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.managers = action.payload;
        state.loading = false;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchManager.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManager.fulfilled, (state, action) => {
        state.currentManager = action.payload;
      })
      .addCase(fetchManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchRooms.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
