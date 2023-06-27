import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

export const pagination = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default pagination.reducer;

export const { setPagination } = pagination.actions;

export const selectPage = (state) => state.pagination.page;
