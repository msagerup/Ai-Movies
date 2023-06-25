import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieDetails: {},
  isLongMouseHover: false,
};

export const movieDetails = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setMouseHoverStatus: (state, action) => {
      state.isLongMouseHover = action.payload;
    },

  },
 
});

export default movieDetails.reducer;

export const detailedMovieSelector = (state) => state.movieDetails;
export const { setMovieDetails, setMouseHoverStatus } = movieDetails.actions;

// Selectors
export const selectMovieDetails = (state) => state.movieDetails.movieDetails;
export const selectIsLongMouseHover = (state) => state.movieDetails.isLongMouseHover;
