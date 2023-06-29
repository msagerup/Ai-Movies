import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: 'notStarted',
};

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    setVideoPlayerState: (state, action) => {
      state.video = action.payload;
    },
  },
});

export default videoPlayerSlice.reducer;

export const { setVideoPlayerState } = videoPlayerSlice.actions;
export const selectVideoPlayerState = (state) => state.videoPlayer;
