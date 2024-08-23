import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUserThunk, getCurrentUserTokenThunk } from './userActions';

const initialState = {
  obj: null,
  type: null,
  department: null,
  balance: null,
  currency: null,
  username: null,
  tbreak: null,
  lunch: null,
  grade: null,
  loading: false,
  error: null,
  config: null,
  shift: null,
  isTable: null,
  isRequest: null,
  expiredTime: null,
  photo:null,
  process_escalade:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.shift = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    setRequest: (state, action) => {
      state.isRequest = action.payload;
    },
    setShift: (state, action) => {
      state.expiredTime = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUserThunk.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.type = action.payload.type;
        state.department = action.payload.department;
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
        state.username = action.payload.username;
        state.tbreak = action.payload.tbreak;
        state.lunch = action.payload.lunch;
        state.grade = action.payload.grade;
        state.config = action.payload.config;
        state.shift = action.payload.shift;
        state.photo = action.payload.photo;
        state.process_escalade = action.payload.config?.process_escalade;
        state.loading = false;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(getCurrentUserTokenThunk.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentUserTokenThunk.fulfilled, (state, action) => {
        state.type = action.payload.type;
        state.department = action.payload.department;
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
        state.username = action.payload.username;
        state.tbreak = action.payload.tbreak;
        state.lunch = action.payload.lunch;
        state.grade = action.payload.grade;
        state.config = action.payload.config;
        state.shift = action.payload.shift;
        state.photo = action.payload.photo;
        state.loading = false;
      })
      .addCase(getCurrentUserTokenThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
  },
});


export const {setUser, setConfig, setRequest, setShift } = userSlice.actions;
export default userSlice.reducer;