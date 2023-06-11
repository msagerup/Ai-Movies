import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreIdOrCategoryName: '',
  page: 1,
  searchQuery: '',
};

export const genreIdOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    setgenreIdOrCategoryName: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.genreIdOrCategoryName = action.payload;
    },
  },
});

export const { setgenreIdOrCategoryName } = genreIdOrCategory.actions;
export default genreIdOrCategory.reducer;
