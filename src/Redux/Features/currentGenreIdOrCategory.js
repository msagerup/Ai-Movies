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
      // Reset search query
      // eslint-disable-next-line no-param-reassign
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.searchQuery = action.payload;
    },
  },
});

export const { setgenreIdOrCategoryName, setSearchQuery } = genreIdOrCategory.actions;
export default genreIdOrCategory.reducer;
