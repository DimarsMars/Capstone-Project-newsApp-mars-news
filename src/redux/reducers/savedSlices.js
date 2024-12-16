import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedNews: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action) => {
      // memastijan tidak menambahkan artikel yang sama
      if (!state.savedNews.some(news => news.abstract === action.payload.abstract)) {
        state.savedNews.push(action.payload);
      }
    },
    removeNews: (state, action) => {
      state.savedNews = state.savedNews.filter(news => news.abstract !== action.payload.abstract);
    },
  },
});

export const { addNews, removeNews } = newsSlice.actions;

export default newsSlice.reducer;