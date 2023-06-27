import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { tmdbApi } from '../Services/TMDB';

console.log('HOW MANY TIME IS THIS RUNNING');

// This is triggered from the onMouse enter event in the Movie comp.
export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieid, thunkAPI) => {
    const result = await thunkAPI.dispatch(tmdbApi.endpoints.getMovieDetails.initiate(movieid));
    return result.data;
  },
  
);

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
  // Sets the state to the payload,(fetchMovieDetails function).
  extraReducers: {
    [fetchMovieDetails.fulfilled]: (state, action) => {
      state.movieDetails = action.payload;  
    },
  },
});

export default movieDetails.reducer;

export const { setMovieDetails, setMouseHoverStatus } = movieDetails.actions;

// Selectors
export const selectMovieDetails = (state) => state.movieDetails.movieDetails;
export const selectIsLongMouseHover = (state) => state.movieDetails.isLongMouseHover;
