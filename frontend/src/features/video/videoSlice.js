import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  video: null,
  searchVideos: [],
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },

    setSearchVideos: (state, action) => {
      state.searchVideos = action.payload;
    },
  },
});

export const { setVideos, setSearchVideos } = videoSlice.actions;
export default videoSlice.reducer;
